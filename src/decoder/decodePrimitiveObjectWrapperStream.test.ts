import { delaySender } from '../_tests/utils/delaySender';
import { encodePrimitiveObjectWrapper } from '../encoder/encodePrimitiveObjectWrapper';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodePrimitiveObjectWrapperStream } from './decodePrimitiveObjectWrapperStream';
import { createDecodeOptions } from './options/createDecodeOptions';

const options = createEncodeOptions();

describe('decodePrimitiveObjectWrapperStream', () => {
    it('should decode object correct', async () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream();

        delaySender(stream, [
            encodePrimitiveObjectWrapper(new Boolean(true), options),
            encodePrimitiveObjectWrapper(new Boolean(false), options),
            encodePrimitiveObjectWrapper(new Number(42), options),
            encodePrimitiveObjectWrapper(new Number(42.15), options),
            encodePrimitiveObjectWrapper(new String('Alex'), options),
        ]);

        expect(await decodePrimitiveObjectWrapperStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new Boolean(true)
        );
        expect(await decodePrimitiveObjectWrapperStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new Boolean(false)
        );
        expect(await decodePrimitiveObjectWrapperStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new Number(42)
        );
        expect(await decodePrimitiveObjectWrapperStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new Number(42.15)
        );
        expect(await decodePrimitiveObjectWrapperStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new String('Alex')
        );
    });
});
