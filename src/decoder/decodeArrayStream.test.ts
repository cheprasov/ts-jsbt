import { delaySender } from '../_tests/utils/delaySender';
import { encodeArray } from '../encoder/encodeArray';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodeArrayStream } from './decodeArrayStream';
import { createDecodeOptions } from './options/createDecodeOptions';

const options = createEncodeOptions();

describe('decodeArrayStream', () => {
    it('should decode array correct', async () => {
        const decodeOptions = createDecodeOptions();

        const stream = new ByteStream();
        delaySender(stream, [
            encodeArray([1, 2, 3, 4, 5], options),
            encodeArray([1, 2, , 4, 5], options),
            encodeArray([], options),
            encodeArray([, , , , , 5], options),
            encodeArray([[1, 2, 3], 'foo', '42', ['1', '2', '3']], options),
            encodeArray([[[[[[[1, 2, 3], 4], 5], 6], 7], 8], 9], options),
        ]);

        expect(await decodeArrayStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual([1, 2, 3, 4, 5]);
        expect(await decodeArrayStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual([1, 2, , 4, 5]);
        expect(await decodeArrayStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual([]);
        expect(await decodeArrayStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual([, , , , , 5]);
        expect(await decodeArrayStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual([
            [1, 2, 3],
            'foo',
            '42',
            ['1', '2', '3'],
        ]);
        expect(await decodeArrayStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual([
            [[[[[[1, 2, 3], 4], 5], 6], 7], 8],
            9,
        ]);
    });
});
