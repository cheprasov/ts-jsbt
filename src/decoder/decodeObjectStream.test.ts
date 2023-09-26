import { delaySender } from '../_tests/utils/delaySender';
import { encodeObject } from '../encoder/encodeObject';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodeObjectStream } from './decodeObjectStream';
import { createDecodeOptions } from './options/createDecodeOptions';

const options = createEncodeOptions();

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
});
