import { delaySender } from '../_tests/utils/delaySender';
import { encodeSet } from '../encoder/encodeSet';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodeSetStream } from './decodeSetStream';
import { createDecodeOptions } from './options/createDecodeOptions';

const options = createEncodeOptions();

describe('decodeSetStream', () => {
    it('should decode object correct', async () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream();
        delaySender(stream, [
            encodeSet(new Set([42, 'baz', 'foo', 'bar']), options),
            encodeSet(new Set(), options),
            encodeSet(new Set([42, 'baz', 'foo', undefined, [1, 2, 3], {}, null, NaN, new Set([1, 2, 3])]), options),
        ]);

        expect(await decodeSetStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new Set([42, 'baz', 'foo', 'bar'])
        );
        expect(await decodeSetStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(new Set());
        expect(await decodeSetStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new Set([42, 'baz', 'foo', undefined, [1, 2, 3], {}, null, NaN, new Set([1, 2, 3])])
        );
    });
});
