import { encodeTypedArray } from '../encoder/encodeTypedArray';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeTypedArray } from './decodeTypedArray';

const options = createEncodeOptions();
const decodeOptions = {
    context: {},
} as IDecodeOptions;

describe('decodeTypedArray', () => {
    it('should decode typed array correct', () => {
        const stream = new ByteStream([
            encodeTypedArray(new Uint8Array([]), options),
            encodeTypedArray(new Uint32Array([]), options),
            encodeTypedArray(new Uint8Array([1, 2, 3, 4, 5]), options),
            encodeTypedArray(new Uint32Array([1111, 2222, 3333, 4444, 5555]), options),
            encodeTypedArray(new Int16Array([0, 258, 0, 0, 0, -3]), options),
            encodeTypedArray(new Uint32Array([1111, 0, 0, 0, 0, 0, 5555]), options),
            encodeTypedArray(new Uint8Array([1, 2, 3, 4, 5]).buffer, options),
            encodeTypedArray(
                new Float32Array([3.1415, -3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1415, 156.25, 17.75]),
                options
            ),
            encodeTypedArray(new Float64Array([3.1415, -3, 1415, 156.25, 17.75]), options),
        ]);
        stream.completeStream();

        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(new Uint8Array([]));
        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(new Uint32Array([]));
        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(
            new Uint32Array([1111, 2222, 3333, 4444, 5555])
        );
        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(
            new Int16Array([0, 258, 0, 0, 0, -3])
        );
        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(
            new Uint32Array([1111, 0, 0, 0, 0, 0, 5555])
        );
        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(
            new Uint8Array([1, 2, 3, 4, 5]).buffer
        );
        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(
            new Float32Array([3.1415, -3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1415, 156.25, 17.75])
        );
        expect(decodeTypedArray(stream.readByte(), stream, decodeOptions)).toEqual(
            new Float64Array([3.1415, -3, 1415, 156.25, 17.75])
        );
    });
});
