import { encodeFloat } from './encodeFloat';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';

describe('encodeFloat', () => {
    it('should encode float correct', () => {
        expectAsBinaryString(encodeFloat(0.1)).toBe(
            '00110111 10011010 10011001 10011001 10011001 10011001 10011001 10111001 00111111'
        );
        expectAsBinaryString(encodeFloat(-0.1)).toBe(
            '00110111 10011010 10011001 10011001 10011001 10011001 10011001 10111001 10111111'
        );

        expectAsBinaryString(encodeFloat(1.0000000000000002, false)).toBe(
            '00110111 00000001 00000000 00000000 00000000 00000000 00000000 11110000 00111111'
        );
        expectAsBinaryString(encodeFloat(1.0000000000000002)).toBe(
            '00111010 10000011 00000001 11110000 00111111'
        );

        expectAsBinaryString(encodeFloat(-1.0000000000000002, false)).toBe(
            '00110111 00000001 00000000 00000000 00000000 00000000 00000000 11110000 10111111'
        );
        expectAsBinaryString(encodeFloat(-1.0000000000000002)).toBe(
            '00111010 10000011 00000001 11110000 10111111'
        );

        expectAsBinaryString(encodeFloat(156.25)).toBe(
            '00110010 10001000 01100011 01000000'
        );
        expectAsBinaryString(encodeFloat(-156.25)).toBe(
            '00110010 10001000 01100011 11000000'
        );

        expectAsBinaryString(encodeFloat(3.141592653589793)).toBe(
            '00110111 00011000 00101101 01000100 01010100 11111011 00100001 00001001 01000000'
        );
        expectAsBinaryString(encodeFloat(-3.141592653589793)).toBe(
            '00110111 00011000 00101101 01000100 01010100 11111011 00100001 00001001 11000000'
        );

        expectAsBinaryString(encodeFloat(17.75)).toBe(
            '00110010 11000000 00110001 01000000'
        );
        expectAsBinaryString(encodeFloat(-17.75)).toBe(
            '00110010 11000000 00110001 11000000'
        );

        expectAsBinaryString(encodeFloat(5e-324, false)).toBe(
            '00110111 00000001 00000000 00000000 00000000 00000000 00000000 00000000 00000000'
        );
        expectAsBinaryString(encodeFloat(5e-324)).toBe(
            '00111000 10000000 00000001'
        );
        expectAsBinaryString(encodeFloat(-5e-324)).toBe(
            '00111001 10000001 00000001 10000000'
        );
    });

    it('should throw error on incorrect type', () => {
        expect(() => {
            encodeFloat(1 as any);
        }).toThrowError();
    });
});
