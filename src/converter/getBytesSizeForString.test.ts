import { getBytesSizeForString } from './getBytesSizeForString';

describe('getBytesSizeForString', () => {
    it('should return correct bytes size', () => {
        expect(getBytesSizeForString('Alex')).toBe(4);
        expect(getBytesSizeForString('🇬🇧')).toBe(8);
        expect(getBytesSizeForString('I💖JS')).toBe(7);
        expect(getBytesSizeForString('�')).toBe(2);
        expect(getBytesSizeForString('� �')).toBe(5);
        expect(getBytesSizeForString('��')).toBe(4);
        expect(getBytesSizeForString('Alex�')).toBe(6);
        expect(getBytesSizeForString('�Alex')).toBe(6);
        expect(getBytesSizeForString('Саша')).toBe(8);
    });
});