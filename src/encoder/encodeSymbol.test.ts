import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeSymbol } from './encodeSymbol';

describe('encodeSymbol', () => {
    it('should encode string correct', () => {
        expectAsBinaryString(encodeSymbol(Symbol.for(''))).toBe('10100000');
        expectAsBinaryString(encodeSymbol(Symbol.for('Alex'))).toBe(
            '10100001 00000100 01000001 01101100 01100101 01111000'
        );
        expectAsBinaryString(encodeSymbol(Symbol.for('🇬🇧')), ' ', '.').toBe(
            '10100001 00001000 11011000.00111100 11011101.11101100 11011000.00111100 11011101.11100111'
        );
        expectAsBinaryString(encodeSymbol(Symbol.for('I💖JS')), ' ', '.').toBe(
            '10100001 00000111 01001001 11011000.00111101 11011100.10010110 01001010 01010011'
        );
        expectAsBinaryString(encodeSymbol(Symbol.for('I💖JS '.repeat(35))), ' ', '.').toBe(
            '10100010 00011000 00000001' +
                ' 01001001 11011000.00111101 11011100.10010110 01001010 01010011 00100000'.repeat(35)
        );
    });

    it('should throw error on incorrect type', () => {
        expect(() => {
            encodeSymbol(1 as any);
        }).toThrowError();
    });
});
