import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodePrimitiveObjectWrapper } from './encodePrimitiveObjectWrapper';
import { createEncodeOptions } from './options/createEncodeOptions';

describe('encodePrimitiveObjectWrapper', () => {
    it('should encode object correctly', () => {
        expectAsBinaryString(encodePrimitiveObjectWrapper(new Boolean(false), createEncodeOptions())).toEqual(
            '11110000 00000000'
        );
        expectAsBinaryString(encodePrimitiveObjectWrapper(new Boolean(true), createEncodeOptions())).toEqual(
            '11110000 00000001'
        );
        expectAsBinaryString(encodePrimitiveObjectWrapper(new String('foo'), createEncodeOptions())).toEqual(
            '11110000 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111'
        );

        expectAsBinaryString(
            encodePrimitiveObjectWrapper(
                new Number(42),
                createEncodeOptions()
            )
        ).toEqual(
            '11110000 ' +
            // 42
            '00100001 00101010'
        );

        expectAsBinaryString(
            encodePrimitiveObjectWrapper(
                new Number(3.1415),
                createEncodeOptions()
            )
        ).toEqual(
            '11110000 ' +
            // 3.1415
            '00110111 01101111 00010010 10000011 11000000 11001010 00100001 00001001 01000000'
        );
    });
});
