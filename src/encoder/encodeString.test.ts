import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeString } from './encodeString';

describe('encodeString', () => {
    it('should encode TRUE correct', () => {
        expectAsBinaryString(encodeString('')).toBe('00010000');
        expectAsBinaryString(encodeString('Alex')).toBe('00010001 00000100 01000001 01101100 01100101 01111000');
        expectAsBinaryString(encodeString('🇬🇧'), ' ', '.').toBe(
            '00010001 00001000 11011000.00111100 11011101.11101100 11011000.00111100 11011101.11100111'
        );
        expectAsBinaryString(encodeString('I💖JS'), ' ', '.').toBe(
            '00010001 00000111 01001001 11011000.00111101 11011100.10010110 01001010 01010011'
        );
        expectAsBinaryString(encodeString('I💖JS '.repeat(35)), ' ', '.').toBe(
            '00010010 00011000 00000001' +
                ' 01001001 11011000.00111101 11011100.10010110 01001010 01010011 00100000'.repeat(35)
        );
    });
});
