import { getBytesSizeForInteger } from './getBytesSizeForInteger';

describe('getBytesSizeForInteger', () => {
    it('should return correct byte size for number', () => {
        expect(getBytesSizeForInteger(0)).toBe(0);
        expect(getBytesSizeForInteger(1)).toBe(1);
        expect(getBytesSizeForInteger(10)).toBe(1);
        expect(getBytesSizeForInteger(42)).toBe(1);
        expect(getBytesSizeForInteger(200)).toBe(1);
        expect(getBytesSizeForInteger(255)).toBe(1);
        expect(getBytesSizeForInteger(256)).toBe(2);
        expect(getBytesSizeForInteger(300)).toBe(2);

        expect(getBytesSizeForInteger(0xFF)).toBe(1);
        expect(getBytesSizeForInteger(0xFFF)).toBe(2);
        expect(getBytesSizeForInteger(0xFFFF - 1)).toBe(2);
        expect(getBytesSizeForInteger(0xFFFF)).toBe(2);
        expect(getBytesSizeForInteger(0xFFFF + 1)).toBe(3);

        expect(getBytesSizeForInteger(0xFFFFFF - 1)).toBe(3);
        expect(getBytesSizeForInteger(0xFFFFFF)).toBe(3);
        expect(getBytesSizeForInteger(0xFFFFFF + 1)).toBe(4);

        expect(getBytesSizeForInteger(0xFFFFFFFF - 1)).toBe(4);
        expect(getBytesSizeForInteger(0xFFFFFFFF)).toBe(4);
        expect(getBytesSizeForInteger(0xFFFFFFFF + 1)).toBe(5);
    });
});
