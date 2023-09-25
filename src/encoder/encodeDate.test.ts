import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeDate } from './encodeDate';

describe('encodeDate', () => {
    it('should encode integer correct', () => {
        expectAsBinaryString(encodeDate(new Date(0))).toBe('11000000');

        expectAsBinaryString(encodeDate(new Date(1))).toBe('11000001 00000001');
        expectAsBinaryString(encodeDate(new Date(-1))).toBe('11001001 00000001');

        expectAsBinaryString(encodeDate(new Date(7))).toBe('11000001 00000111');
        expectAsBinaryString(encodeDate(new Date(-7))).toBe('11001001 00000111');

        expectAsBinaryString(encodeDate(new Date(256))).toBe('11000010 00000000 00000001');
        expectAsBinaryString(encodeDate(new Date(-256))).toBe('11001010 00000000 00000001');

        expectAsBinaryString(encodeDate(new Date(1_234_567_890))).toBe('11000100 11010010 00000010 10010110 01001001');
        expectAsBinaryString(encodeDate(new Date(-1_234_567_890))).toBe('11001100 11010010 00000010 10010110 01001001');

        expectAsBinaryString(encodeDate(new Date(8640000000000000))).toBe(
            '11000111 00000000 00000000 11011100 11000010 00001000 10110010 00011110'
        );
        expectAsBinaryString(encodeDate(new Date(-8640000000000000))).toBe(
            '11001111 00000000 00000000 11011100 11000010 00001000 10110010 00011110'
        );
    });

    it('should throw error on incorrect type', () => {
        expect(() => {
            encodeDate(234 as any);
        }).toThrowError();
    });
});
