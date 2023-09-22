import { encodeArray } from '../encoder/encodeArray';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeArray } from './decodeArray';

const options = createEncodeOptions();
const decodeOptions = {
    context: {},
} as IDecodeOptions;

describe('decodeArray', () => {
    it('should decode array correct', () => {
        const stream = new ByteStream([
            encodeArray([1, 2, 3, 4, 5], options),
            encodeArray([1, 2, , 4, 5], options),
            encodeArray([], options),
            encodeArray([, , , , , 5], options),
            encodeArray([[1, 2, 3], 'foo', '42', ['1', '2', '3']], options),
            encodeArray([[[[[[[1, 2, 3], 4], 5], 6], 7], 8], 9], options),
        ]);
        stream.completeStream();

        expect(decodeArray(stream.readByte(), stream, decodeOptions)).toEqual([1, 2, 3, 4, 5]);
        expect(decodeArray(stream.readByte(), stream, decodeOptions)).toEqual([1, 2, , 4, 5]);
        expect(decodeArray(stream.readByte(), stream, decodeOptions)).toEqual([]);
        expect(decodeArray(stream.readByte(), stream, decodeOptions)).toEqual([, , , , , 5]);
        expect(decodeArray(stream.readByte(), stream, decodeOptions)).toEqual([
            [1, 2, 3],
            'foo',
            '42',
            ['1', '2', '3'],
        ]);
        expect(decodeArray(stream.readByte(), stream, decodeOptions)).toEqual([[[[[[[1, 2, 3], 4], 5], 6], 7], 8], 9]);
    });
});
