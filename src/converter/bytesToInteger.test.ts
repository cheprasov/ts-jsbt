import { bytesToInteger } from './bytesToInteger'

describe('bytesToInteger', () => {

    it('should convert bytes to int correct', () => {
        expect(bytesToInteger([255])).toBe(255);
        expect(bytesToInteger([0, 1])).toBe(256);
        expect(bytesToInteger([1, 1])).toBe(257);
        expect(bytesToInteger([0, 0, 1])).toBe(65536);
        expect(bytesToInteger([0, 0, 0, 1])).toBe(16777216);
        expect(bytesToInteger([0, 0, 0, 0, 1])).toBe(4294967296);
        expect(bytesToInteger([0, 0, 0, 0, 0, 1])).toBe(1099511627776);
    });

})