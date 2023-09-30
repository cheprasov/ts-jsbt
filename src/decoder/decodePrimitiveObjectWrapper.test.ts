import { encodePrimitiveObjectWrapper } from '../encoder/encodePrimitiveObjectWrapper';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodePrimitiveObjectWrapper } from './decodePrimitiveObjectWrapper';
import { createDecodeOptions } from './options/createDecodeOptions';

const options = createEncodeOptions();

describe('decodePrimitiveObjectWrapper', () => {
    it('should decode object correct', () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream([
            encodePrimitiveObjectWrapper(new Boolean(true), options),
            encodePrimitiveObjectWrapper(new Boolean(false), options),
            encodePrimitiveObjectWrapper(new Number(42), options),
            encodePrimitiveObjectWrapper(new Number(42.15), options),
            encodePrimitiveObjectWrapper(new String('Alex'), options),
        ]);
        stream.completeStream();

        expect(decodePrimitiveObjectWrapper(stream.readByte(), stream, decodeOptions)).toEqual(new Boolean(true));
        expect(decodePrimitiveObjectWrapper(stream.readByte(), stream, decodeOptions)).toEqual(new Boolean(false));
        expect(decodePrimitiveObjectWrapper(stream.readByte(), stream, decodeOptions)).toEqual(new Number(42));
        expect(decodePrimitiveObjectWrapper(stream.readByte(), stream, decodeOptions)).toEqual(new Number(42.15));
        expect(decodePrimitiveObjectWrapper(stream.readByte(), stream, decodeOptions)).toEqual(new String('Alex'));
    });
});
