import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodePrimitiveObjectWrapper } from './encodePrimitiveObjectWrapper';
import { createEncodeOptions } from './options/createEncodeOptions';

describe('encodePrimitiveObjectWrapper', () => {
    it('should encode object correctly', () => {
        let options = createEncodeOptions();
        encodePrimitiveObjectWrapper(new Boolean(false), options)
        expectAsBinaryString(options.writer.toString()).toEqual('11110000 00000000');

        options = createEncodeOptions();
        encodePrimitiveObjectWrapper(new Boolean(true), options)
        expectAsBinaryString(options.writer.toString()).toEqual('11110000 00000001');

        options = createEncodeOptions();
        encodePrimitiveObjectWrapper(new String('foo'), options)
        expectAsBinaryString(options.writer.toString()).toEqual(
            '11110000 ' +
                // foo
                '00010001 00000011 01100110 01101111 01101111'
        );

        options = createEncodeOptions();
        encodePrimitiveObjectWrapper(new Number(42), options)
        expectAsBinaryString(options.writer.toString()).toEqual(
            '11110000 ' +
                // 42
                '00100001 00101010'
        );

        options = createEncodeOptions();
        encodePrimitiveObjectWrapper(new Number(3.1415), options)
        expectAsBinaryString(options.writer.toString()).toEqual(
            '11110000 ' +
                // 3.1415
                '00110111 01101111 00010010 10000011 11000000 11001010 00100001 00001001 01000000'
        );
    });
});
