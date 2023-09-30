import { JSBT } from './JSBT';
import { delaySender } from './_tests/utils/delaySender';
import { expectAsBinaryString } from './_tests/utils/expectAsBinaryString';
import ByteStream from './reader/ByteStream';

describe('JSBT', () => {
    describe('encode', () => {
        it('should encode value correctly', () => {
            const obj: any = {
                userA: {
                    name: 'Alex',
                },
                userB: {
                    name: 'Alex',
                },
                userC: {
                    name: 'Alex',
                },
            };
            obj.userD = obj.userC;

            expectAsBinaryString(JSBT.encode(obj)).toEqual(
                // root object, refID 0
                '01110001 00000100 ' +
                    // userA key, refID 1
                    '00010001 00000101 01110101 01110011 01100101 01110010 01000001 ' +
                    // userA object, refID 2
                    '01110001 00000001 ' +
                    // name refID 3
                    '00010001 00000100 01101110 01100001 01101101 01100101 ' +
                    // Alex refID 4
                    '00010001 00000100 01000001 01101100 01100101 01111000 ' +
                    // userB key refID 5
                    '00010001 00000101 01110101 01110011 01100101 01110010 01000010 ' +
                    // userB object refID 6
                    '01110001 00000001 ' +
                    // ref name
                    '10110001 00000011 ' +
                    // ref Alex
                    '10110001 00000100 ' +
                    // userC key // refID 7
                    '00010001 00000101 01110101 01110011 01100101 01110010 01000011 ' +
                    // copy ref to userB object // refID 8
                    '10111001 00000110 ' +
                    // userD key // refID 9
                    '00010001 00000101 01110101 01110011 01100101 01110010 01000100 ' +
                    // link ref to userC object
                    '10110001 00001000'
            );
        });
    });

    describe('decode', () => {
        it('should decode JSBT message correct', () => {
            expect(JSBT.decode(JSBT.encode('Alex'))).toBe('Alex');
            expect(JSBT.decode(JSBT.encode('🇬🇧'))).toBe('🇬🇧');
            expect(JSBT.decode(JSBT.encode(''))).toBe('');
            expect(JSBT.decode(JSBT.encode(true))).toBe(true);
        });

        it('should decode JSBT message with refs correct', () => {
            expect(JSBT.decode(JSBT.encode(['Alex', 'Alex', 'Alex']))).toEqual(['Alex', 'Alex', 'Alex']);
            expect(JSBT.decode(JSBT.encode(['Alex', 'Foo', 'Alex', 'Foo']))).toEqual(['Alex', 'Foo', 'Alex', 'Foo']);
        });

        it('should decode JSBT message with refs correct', () => {
            const obj: any = {
                userA: {
                    name: 'Alex',
                },
                userB: {
                    name: 'Alex',
                },
                userC: {
                    name: 'Alex',
                },
            };
            obj.userD = obj.userC;
            const res = JSBT.decode(JSBT.encode(obj));
            expect(res).toEqual(obj);
            expect(res.userC).toBe(res.userD);
            expect(res.userA).not.toBe(res.userB);
            expect(res.userA).not.toBe(res.userC);
            expect(res.userB).not.toBe(res.userC);
        });

        it('should decode JSBT message with refs correct', () => {
            const obj: any = {
                foo: 'bar',
                baz: 1_000_000,
                ar1: [1, 2, 3, 1_000_000],
                ar2: [1, 2, 3, 1_000_000],
                ar3: [1, 2, 3, 1_000_000],
            };
            obj.ar4 = obj.ar3;

            const res = JSBT.decode(JSBT.encode(obj));
            expect(res).toEqual(obj);

            expect(res.ar3).toBe(res.ar4);
            expect(res.ar1).not.toBe(res.ar2);
            expect(res.ar1).not.toBe(res.ar3);
            expect(res.ar2).not.toBe(res.ar3);
        });

        it('should decode JSBT message with refs correct', () => {
            const obj: any = {
                foo: 'bar',
                ar: ['bar', 'bar', 'foo', 'foo'],
                ar1: ['bar', 'bar', 'foo', 'foo'],
                skips: [11, 42, true, false, NaN, undefined, null, +Infinity, -Infinity],
                skipsAgain: [11, 42, true, false, NaN, undefined, null, +Infinity, -Infinity],
                refs1: [3.1415, 123.456, 42000],
                refs2: [3.1415, 123.456, 42000],
            };
            obj.ar2 = obj.ar1;
            obj.refs3 = obj.refs2;

            const res = JSBT.decode(JSBT.encode(obj));
            expect(res).toEqual(obj);

            expect(res.refs3).toBe(res.refs2);
            expect(res.ar2).toBe(res.ar1);
        });

        it('should decode JSBT message with circular refs correct', () => {
            const user: any = {
                name: 'Alex',
                friends: [],
                set: new Set(),
            };
            user.friends.push(user);
            user.set.add(user);

            const res = JSBT.decode(JSBT.encode(user));
            expect(res).toEqual(user);
        });

        it('should decode JSBT message with circular refs correct', () => {
            const foo: any = {
                bar: {},
                baz: {},
            };
            foo.bar.baz = foo.baz;
            foo.baz.bar = foo.bar;

            const res = JSBT.decode(JSBT.encode(foo));
            expect(res.bar.baz).toBe(res.baz);
            expect(res.baz.bar).toBe(res.bar);
        });

        it('should decode JSBT message with dates correct', () => {
            const birthdays: any = {
                Alex: new Date('1984-10-10'),
                Matvey: new Date('2021-09-16T17:52:00'),
                Ira: new Date('1982-12-30'),
            };
            const res = JSBT.decode(JSBT.encode(birthdays));
            expect(res).toEqual(birthdays);
        });

        it('should decode primitive object wrappers correct', () => {
            expect(
                JSBT.decode(
                    JSBT.encode([
                        new Boolean(true),
                        new Boolean(false),
                        new Number(42),
                        new Number(3.15),
                        new String('bla-bla'),
                        new Boolean(true),
                        new Boolean(false),
                        new Number(42),
                        new Number(3.15),
                        new String('bla-bla'),
                        new Boolean(true),
                        new Boolean(false),
                        new Number(42),
                        new Number(3.15),
                        new String('bla-bla'),
                    ])
                )
            ).toEqual([
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
            ]);
        });
    });

    describe('decodeStream', () => {
        it('should decode stream message', async () => {
            const obj = {
                constants: {
                    true: true,
                    false: false,
                    null: null,
                    undefined: undefined,
                    NaN: NaN,
                    PosInfinity: Infinity,
                    NegInfinity: -Infinity,
                },
                strings: {
                    user: 'Alex',
                    profession: 'IT',
                    country: '🇬🇧',
                },
                integers: [0, -0, 1, -1, 256, -256, 12_345_678, -12_345_678],
                floats: [10.1, 17.34, 3.1415, -3.1415, 0.335],
                bigInts: [
                    0n,
                    10n,
                    -13353n,
                    132131231231235535525525325235235235235235n,
                    -1343242345225252582365862385628653n,
                ],
                arrays: [
                    [1, 2, 3],
                    [4, 5, 6, 7, 8],
                    [, , , , , 10],
                ],
                typedArrays: [
                    new Uint16Array([1, 2, 3, 256, 1267, 134255]),
                    new Int32Array([1, 2, -3, -256, 1267, -134255]),
                    new Uint8Array([1, 2, 3, 255]),
                ],
                objects: {
                    foo: {
                        bar: {
                            baz: 42,
                            bar: 43,
                            foo: 17,
                        },
                    },
                },
                sets: [new Set(['foo', 'baz', 'bar']), new Set(['1', '2', 1, 2])],
                maps: [
                    new Map([
                        ['foo', 42],
                        ['baz', 43],
                        ['bar', 17],
                    ]),
                    new Map<any, any>([
                        [{}, 'foo'],
                        [[], 'bar'],
                        [true, 'baz'],
                    ]),
                ],
                symbols: {
                    [Symbol.for('foo')]: Symbol.for('42'),
                    [Symbol.for('bar')]: Symbol.for('12'),
                    [Symbol.for('baz')]: Symbol.for('111'),
                },
                dates: {
                    today: new Date('2023-09-26T21:37:00Z'),
                    tomorrow: new Date('2023-09-27T21:37:00Z'),
                    yesterday: new Date('2023-09-25T21:37:00Z'),
                },
            };

            const stream = new ByteStream();
            delaySender(stream, [JSBT.encode(obj)]);

            const res = await JSBT.decodeStream(stream);
            expect(res).toEqual(obj);
        });

        it('should allow to decode several joined messages', async () => {
            const stream = new ByteStream();
            delaySender(stream, [
                JSBT.encode(42),
                JSBT.encode('Alex'),
                JSBT.encode('foo'),
                JSBT.encode('bar'),
                JSBT.encode('bar'),
                JSBT.encode('bar'),
                JSBT.encode('bar'),
                JSBT.encode('foo'),
                JSBT.encode('Alex'),
                JSBT.encode('Alex'),
                JSBT.encode(42),
            ]);

            expect(await JSBT.decodeStream(stream)).toBe(42);
            expect(await JSBT.decodeStream(stream)).toBe('Alex');
            expect(await JSBT.decodeStream(stream)).toBe('foo');
            expect(await JSBT.decodeStream(stream)).toBe('bar');
            expect(await JSBT.decodeStream(stream)).toBe('bar');
            expect(await JSBT.decodeStream(stream)).toBe('bar');
            expect(await JSBT.decodeStream(stream)).toBe('bar');
            expect(await JSBT.decodeStream(stream)).toBe('foo');
            expect(await JSBT.decodeStream(stream)).toBe('Alex');
            expect(await JSBT.decodeStream(stream)).toBe('Alex');
            expect(await JSBT.decodeStream(stream)).toBe(42);
        });

        it('should decode primitive object wrappers correct', async () => {
            const stream = new ByteStream();
            delaySender(stream, [JSBT.encode([
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
            ])]);

            expect(await JSBT.decodeStream(stream)).toEqual([
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
                new Boolean(true),
                new Boolean(false),
                new Number(42),
                new Number(3.15),
                new String('bla-bla'),
            ]);
        });
    });
});
