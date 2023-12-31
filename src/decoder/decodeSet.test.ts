import { encodeSet } from '../encoder/encodeSet';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodeSet } from './decodeSet';
import { createDecodeOptions } from './options/createDecodeOptions';

const options = createEncodeOptions();

describe('decodeSet', () => {
    it('should decode object correct', () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream([
            encodeSet(new Set([42, 'baz', 'foo', 'bar']), options),
            encodeSet(new Set(), options),
            encodeSet(new Set([42, 'baz', 'foo', undefined, [1, 2, 3], {}, null, NaN, new Set([1, 2, 3])]), options),
        ]);
        stream.completeStream();

        expect(decodeSet(stream.readByte(), stream, decodeOptions)).toEqual(new Set([42, 'baz', 'foo', 'bar']));
        expect(decodeSet(stream.readByte(), stream, decodeOptions)).toEqual(new Set());
        expect(decodeSet(stream.readByte(), stream, decodeOptions)).toEqual(
            new Set([42, 'baz', 'foo', undefined, [1, 2, 3], {}, null, NaN, new Set([1, 2, 3])])
        );
    });
});
