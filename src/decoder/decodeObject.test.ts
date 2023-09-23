import { encodeObject } from '../encoder/encodeObject';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeObject } from './decodeObject';

const options = createEncodeOptions();
const decodeOptions = {
    context: {},
} as IDecodeOptions;

describe('decodeObject', () => {
    it('should decode object correct', () => {
        const stream = new ByteStream([
            encodeObject({ 42: 'baz', foo: 'bar' }, options),
            encodeObject({ 42: 'baz', foo: undefined, baz: null, n: NaN }, options),
            encodeObject({ user: 'Alex', age: 38, hobby: { chess: 'beginner', it: 'expert' } }, options),
            encodeObject({ foo: { bar: 1, baz: { foo: 42, 42: 'foo' } } }, options),
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
            foo: { bar: 1, baz: { foo: 42, 42: 'foo' } },
        });
    });
});
