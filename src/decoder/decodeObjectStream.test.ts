import { delaySender } from '../_tests/utils/delaySender';
import { encodeClassInstance } from '../encoder/encodeClassInstance';
import { encodeObject } from '../encoder/encodeObject';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodeObjectStream } from './decodeObjectStream';
import { createDecodeOptions } from './options/createDecodeOptions';

const options = createEncodeOptions();

class User {
    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    toJSBT() {
        return {
            name: this._name,
            email: this._email,
        };
    }
}

describe('decodeObjectStream', () => {
    it('should decode object correct', async () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream();
        delaySender(stream, [
            encodeObject({ 42: 'baz', foo: 'bar' }, options),
            encodeObject({ 42: 'baz', foo: undefined, baz: null, n: NaN }, options),
            encodeObject({ user: 'Alex', age: 38, hobby: { chess: 'beginner', it: 'expert' } }, options),
            encodeObject({ foo: { bar: 1, baz: { foo: 42, 42: 'foo', [Symbol.for('foo')]: 1010 } } }, options),
        ]);

        expect(await decodeObjectStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual({
            42: 'baz',
            foo: 'bar',
        });
        expect(await decodeObjectStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual({
            42: 'baz',
            foo: undefined,
            baz: null,
            n: NaN,
        });
        expect(await decodeObjectStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual({
            user: 'Alex',
            age: 38,
            hobby: { chess: 'beginner', it: 'expert' },
        });
        expect(await decodeObjectStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual({
            foo: { bar: 1, baz: { foo: 42, 42: 'foo', [Symbol.for('foo')]: 1010 } },
        });
    });

    it('should class instance as object correct', async () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream();
        delaySender(stream, [
            encodeClassInstance(new User('Alex', 'alex@test.com'), options),
        ]);

        const user = await decodeObjectStream(await stream.readStreamByte(), stream, decodeOptions);
        expect(user).toEqual({
            email: 'alex@test.com',
            name: 'Alex',
        });
        expect(user.__jsbtConstructorName).toEqual('User');
    });
});
