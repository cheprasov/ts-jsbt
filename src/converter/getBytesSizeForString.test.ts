import { getBytesSizeForString } from './getBytesSizeForString';

describe('getBytesSizeForString', () => {
    it('should return correct bytes size', () => {
        expect(getBytesSizeForString('Alex')).toBe(4);
        expect(getBytesSizeForString('🇬🇧')).toBe(8);
        expect(getBytesSizeForString('I💖JS')).toBe(7);
    });
});