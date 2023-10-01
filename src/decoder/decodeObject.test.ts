import { encodeClassInstance } from '../encoder/encodeClassInstance';
import { encodeObject } from '../encoder/encodeObject';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodeObject } from './decodeObject';
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

describe('decodeObject', () => {
    it('should decode object correct', () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream([
            encodeObject({ 42: 'baz', foo: 'bar' }, options),
            encodeObject({ 42: 'baz', foo: undefined, baz: null, n: NaN }, options),
            encodeObject({ user: 'Alex', age: 38, hobby: { chess: 'beginner', it: 'expert' } }, options),
            encodeObject({ foo: { bar: 1, baz: { foo: 42, 42: 'foo', [Symbol.for('foo')]: 1010 } } }, options),
        ]);
        stream.completeStream();

        expect(decodeObject(stream.readByte(), stream, decodeOptions)).toEqual({ 42: 'baz', foo: 'bar' });
        expect(decodeObject(stream.readByte(), stream, decodeOptions)).toEqual({
            42: 'baz',
            foo: undefined,
            baz: null,
            n: NaN,
        });
        expect(decodeObject(stream.readByte(), stream, decodeOptions)).toEqual({
            user: 'Alex',
            age: 38,
            hobby: { chess: 'beginner', it: 'expert' },
        });
        expect(decodeObject(stream.readByte(), stream, decodeOptions)).toEqual({
            foo: { bar: 1, baz: { foo: 42, 42: 'foo', [Symbol.for('foo')]: 1010 } },
        });
    });

    it('should class instance as object correct', () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream([
            encodeClassInstance(new User('Alex', 'alex@test.com'), options),
        ]);
        stream.completeStream();
        const user = decodeObject(stream.readByte(), stream, decodeOptions);
        expect(user).toEqual({
            email: 'alex@test.com',
            name: 'Alex',
        });
        expect(user.__jsbtConstructorName).toEqual('User');
    });
});
