import { integerToBytes } from './integerToBytes';

describe('integerToBytes', () => {
    it('should return bytes for positive Integer', () => {
        expect(integerToBytes(1)).toEqual([0x01]);
        expect(integerToBytes(255)).toEqual([0xFF]);
        expect(integerToBytes(256)).toEqual([0x00, 0x01]);
        expect(integerToBytes(257)).toEqual([0x01, 0x01]);
        expect(integerToBytes(4370)).toEqual([0x12, 0x11]);
    });

    it('should return bytes for negative Integer', () => {
        expect(integerToBytes(-1)).toEqual([0xFF, 0xFF, 0xFF, 0xFF]);
        expect(integerToBytes(-2)).toEqual([0xFE, 0xFF, 0xFF, 0xFF]);
        expect(integerToBytes(-255)).toEqual([0x01, 0xFF, 0xFF, 0xFF]);
        expect(integerToBytes(-256)).toEqual([0x00, 0xFF, 0xFF, 0xFF]);
        expect(integerToBytes(-257)).toEqual([0xFF, 0xFE, 0xFF, 0xFF]);
    });

    it('should return correct bytes at Big-Endian order', () => {
        expect(integerToBytes(1, 1, true)).toEqual([0x01]);
        expect(integerToBytes(255, 1, true)).toEqual([0xFF]);
        expect(integerToBytes(255, 3, true)).toEqual([0x00, 0x00, 0xFF]);

        expect(integerToBytes(256, 1, true)).toEqual([0x00]);
        expect(integerToBytes(256, 2, true)).toEqual([0x01, 0x00]);

        expect(integerToBytes(4370, 1, true)).toEqual([0x12]);
        expect(integerToBytes(4370, 2, true)).toEqual([0x11, 0x12]);
        expect(integerToBytes(4370, 3, true)).toEqual([0x00, 0x11, 0x12]);

        expect(integerToBytes(-1, 2, true)).toEqual([0xFF, 0xFF]);
        expect(integerToBytes(-2, 2, true)).toEqual([0xFF, 0xFE]);
    });

    it('should return correct bytes at Little-Endian order', () => {
        expect(integerToBytes(1, 1)).toEqual([0x01]);
        expect(integerToBytes(255, 1)).toEqual([0xFF]);
        expect(integerToBytes(255, 3)).toEqual([0xFF, 0x00, 0x00]);

        expect(integerToBytes(256, 1)).toEqual([0x00]);
        expect(integerToBytes(256, 2)).toEqual([0x00, 0x01]);

        expect(integerToBytes(4370, 1)).toEqual([0x12]);
        expect(integerToBytes(4370, 2)).toEqual([0x12, 0x11]);
        expect(integerToBytes(4370, 3)).toEqual([0x12, 0x11, 0x00]);

        expect(integerToBytes(-2, 2)).toEqual([0xFE, 0xFF]);
    });

    it('should return bytes for large Integer', () => {
        expect(integerToBytes(0xFF_FF_FF_FE)).toEqual([0xFE, 0xFF, 0xFF, 0xFF]);
        expect(integerToBytes(0xFF_FF_FF_FA)).toEqual([0xFA, 0xFF, 0xFF, 0xFF]);
        expect(integerToBytes(0xFF_FF_FF_FF)).toEqual([0xFF, 0xFF, 0xFF, 0xFF]);
        expect(integerToBytes(-0xFF_FF_FF_FF)).toEqual([0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF]);
        expect(integerToBytes(-0xFF_FF_FF, 4)).toEqual([0x01, 0x00, 0x00, 0xFF]);
    });
});