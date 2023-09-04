import { stringToBinaryString } from './stringToBinaryString';

describe('stringToBinaryString', () => {
    it('should return correct result', () => {
        expect(stringToBinaryString('')).toBe('');
        expect(stringToBinaryString(`\x00`)).toBe(
            '00000000'
        );
        expect(stringToBinaryString(`\xFF`)).toBe(
            '11111111'
        );
        expect(stringToBinaryString(`foo 42`, ' ')).toBe(
            '01100110 01101111 01101111 00100000 00110100 00110010'
        );
        expect(stringToBinaryString('Alex', ' ')).toBe(
            '01000001 01101100 01100101 01111000'
        );
        expect(stringToBinaryString('🇬🇧', ' ', '.')).toBe(
            '11011000.00111100 11011101.11101100 11011000.00111100 11011101.11100111'
        );
        expect(stringToBinaryString('I💖JS', ' ', '.')).toBe(
            '01001001 11011000.00111101 11011100.10010110 01001010 01010011'
        );
    });
});
