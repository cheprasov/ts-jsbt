import { EConstantByteCode } from '../EConstantByte';
import { encodeBoolean } from './encodeBoolean';
import { stringToBinaryString } from './../converter/stringToBinaryString';

describe('encodeBoolean', () => {

    it('should encode TRUE correct', () => {
        expect(stringToBinaryString(encodeBoolean(true) as any)).toBe('00000001');
    });

});