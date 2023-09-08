import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeInteger } from './encodeInteger';

describe('encodeInteger', () => {
    it('should encode string correct', () => {
        expectAsBinaryString(encodeInteger(0)).toBe('00100000');
        expectAsBinaryString(encodeInteger(-0)).toBe('00101000');

        expectAsBinaryString(encodeInteger(1)).toBe('00100001 00000001');
        expectAsBinaryString(encodeInteger(-1)).toBe('00101001 00000001');

        expectAsBinaryString(encodeInteger(7)).toBe('00100001 00000111');
        expectAsBinaryString(encodeInteger(-7)).toBe('00101001 00000111');

        expectAsBinaryString(encodeInteger(256)).toBe('00100010 00000000 00000001');
        expectAsBinaryString(encodeInteger(-256)).toBe('00101010 00000000 00000001');

        expectAsBinaryString(encodeInteger(1_234_567_890)).toBe('00100100 11010010 00000010 10010110 01001001');
        expectAsBinaryString(encodeInteger(-1_234_567_890)).toBe('00101100 11010010 00000010 10010110 01001001');

        expectAsBinaryString(encodeInteger(9007199254740990)).toBe(
            '00100111 11111110 11111111 11111111 11111111 11111111 11111111 00011111'
        );
        expectAsBinaryString(encodeInteger(9007199254740991)).toBe(
            '00100111 11111111 11111111 11111111 11111111 11111111 11111111 00011111'
        );
        expectAsBinaryString(encodeInteger(-9007199254740991)).toBe(
            '00101111 11111111 11111111 11111111 11111111 11111111 11111111 00011111'
        );
    });

    it('should throw error on incorrect type', () => {
        expect(() => {
            encodeInteger(true as any);
        }).toThrowError();
    });
});
