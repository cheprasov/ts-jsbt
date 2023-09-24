import { JSBT } from './JSBT';
import { expectAsBinaryString } from './_tests/utils/expectAsBinaryString';

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

            console.time('JSBT');
            const jsbt = JSBT.encode(obj);
            console.timeEnd('JSBT');

            console.time('JSON');
            const json = JSON.stringify(obj);
            console.timeEnd('JSON');

            console.log('JSBT', 'len', jsbt.length, '\n', '\n');
            console.log('JSON', 'len', json.length, '\n', '\n');
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
    });
});
