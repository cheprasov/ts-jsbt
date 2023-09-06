import { getBytesFromInteger } from './getBytesFromInteger';

describe('getBytesFromInteger', () => {
    it('should return bytes for Integer', () => {
        expect(getBytesFromInteger(1)).toEqual([0x01]);
        expect(getBytesFromInteger(255)).toEqual([0xFF]);
        expect(getBytesFromInteger(256)).toEqual([0x01, 0x00]);
        expect(getBytesFromInteger(4370)).toEqual([0x11, 0x12]);

        expect(getBytesFromInteger(-1)).toEqual([0xFF, 0xFF, 0xFF, 0xFF]);
        expect(getBytesFromInteger(-2)).toEqual([0xFF, 0xFF, 0xFF, 0xFE]);
    });

    it('should return correct bytes at Big-Endian order', () => {
        expect(getBytesFromInteger(1, 1)).toEqual([0x01]);
        expect(getBytesFromInteger(255, 1)).toEqual([0xFF]);
        expect(getBytesFromInteger(255, 3)).toEqual([0x00, 0x00, 0xFF]);

        expect(getBytesFromInteger(256, 1)).toEqual([0x00]);
        expect(getBytesFromInteger(256, 2)).toEqual([0x01, 0x00]);

        expect(getBytesFromInteger(4370, 1)).toEqual([0x12]);
        expect(getBytesFromInteger(4370, 2)).toEqual([0x11, 0x12]);
        expect(getBytesFromInteger(4370, 3)).toEqual([0x00, 0x11, 0x12]);

        expect(getBytesFromInteger(-1, 2)).toEqual([0xFF, 0xFF]);
        expect(getBytesFromInteger(-2, 2)).toEqual([0xFF, 0xFE]);
    });

    it('should return correct bytes at Little-Endian order', () => {
        expect(getBytesFromInteger(1, 1, false)).toEqual([0x01]);
        expect(getBytesFromInteger(255, 1, false)).toEqual([0xFF]);
        expect(getBytesFromInteger(255, 3, false)).toEqual([0xFF, 0x00, 0x00]);

        expect(getBytesFromInteger(256, 1, false)).toEqual([0x00]);
        expect(getBytesFromInteger(256, 2, false)).toEqual([0x00, 0x01]);

        expect(getBytesFromInteger(4370, 1, false)).toEqual([0x12]);
        expect(getBytesFromInteger(4370, 2, false)).toEqual([0x12, 0x11]);
        expect(getBytesFromInteger(4370, 3, false)).toEqual([0x12, 0x11, 0x00]);

        expect(getBytesFromInteger(-2, 2, false)).toEqual([0xFE, 0xFF]);
    });
});