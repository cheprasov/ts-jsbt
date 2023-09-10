import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeBigInt } from './encodeBigInt';

describe('encodeBigInt', () => {
    it('should encode bigint correct', () => {
        expectAsBinaryString(encodeBigInt(0n)).toBe('01000000');
        expectAsBinaryString(encodeBigInt(1n)).toBe('01000001 00000001 00000001');
        expectAsBinaryString(encodeBigInt(-1n)).toBe('01001001 00000001 00000001');

        expectAsBinaryString(encodeBigInt(257n)).toBe('01000001 00000010 00000001 00000001');
        expectAsBinaryString(encodeBigInt(-257n)).toBe('01001001 00000010 00000001 00000001');

        expectAsBinaryString(encodeBigInt(12345678901234567890n)).toBe(
            '01000001 00001000 11010010 00001010 00011111 11101011 10001100 10101001 01010100 10101011'
        );
    });

    it('should encode large bigint correct', () => {
        const count = 100;
        const init = 0xffeeddccbbaa9900n;
        let bint = 0n;
        for (let i = 0; i < count; i += 1) {
            bint = (bint << 64n) | init;
        }
        expectAsBinaryString(encodeBigInt(bint)).toBe(
            '01000010 00100000 00000011' +
                ' 00000000 10011001 10101010 10111011 11001100 11011101 11101110 11111111'.repeat(count)
        );
    });

    it('should throw error on incorrect type', () => {
        expect(() => {
            encodeBigInt(1 as any);
        }).toThrowError();
    });
});
