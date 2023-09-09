import { bigIntToBytes } from './bigIntToBytes';

describe('bigIntToBytes', () => {
    it('should return bytes for positive Integer', () => {
        expect(bigIntToBytes(1n)).toEqual([0x01n]);
        expect(bigIntToBytes(255n)).toEqual([0xFFn]);
        expect(bigIntToBytes(256n)).toEqual([0x00n, 0x01n]);
        expect(bigIntToBytes(257n)).toEqual([0x01n, 0x01n]);
        expect(bigIntToBytes(4370n)).toEqual([0x12n, 0x11n]);
    });

    it('should return bytes for negative Integer', () => {
        expect(bigIntToBytes(-1n, 4)).toEqual([0xFFn, 0xFFn, 0xFFn, 0xFFn]);
        expect(bigIntToBytes(-2n, 4)).toEqual([0xFEn, 0xFFn, 0xFFn, 0xFFn]);
        expect(bigIntToBytes(-255n, 4)).toEqual([0x01n, 0xFFn, 0xFFn, 0xFFn]);
        expect(bigIntToBytes(-256n, 4)).toEqual([0x00n, 0xFFn, 0xFFn, 0xFFn]);
        expect(bigIntToBytes(-257n, 4)).toEqual([0xFFn, 0xFEn, 0xFFn, 0xFFn]);
    });

    it('should return correct bytes at Big-Endian order', () => {
        expect(bigIntToBytes(1n, 1, true)).toEqual([0x01n]);
        expect(bigIntToBytes(255n, 1, true)).toEqual([0xFFn]);
        expect(bigIntToBytes(255n, 3, true)).toEqual([0x00n, 0x00n, 0xFFn]);

        expect(bigIntToBytes(256n, 1, true)).toEqual([0x00n]);
        expect(bigIntToBytes(256n, 2, true)).toEqual([0x01n, 0x00n]);

        expect(bigIntToBytes(4370n, 1, true)).toEqual([0x12n]);
        expect(bigIntToBytes(4370n, 2, true)).toEqual([0x11n, 0x12n]);
        expect(bigIntToBytes(4370n, 3, true)).toEqual([0x00n, 0x11n, 0x12n]);

        expect(bigIntToBytes(-1n, 2, true)).toEqual([0xFFn, 0xFFn]);
        expect(bigIntToBytes(-2n, 2, true)).toEqual([0xFFn, 0xFEn]);
    });

    it('should return correct bytes at Little-Endian order', () => {
        expect(bigIntToBytes(1n, 1)).toEqual([0x01n]);
        expect(bigIntToBytes(255n, 1)).toEqual([0xFFn]);
        expect(bigIntToBytes(255n, 3)).toEqual([0xFFn, 0x00n, 0x00n]);

        expect(bigIntToBytes(256n, 1)).toEqual([0x00n]);
        expect(bigIntToBytes(256n, 2)).toEqual([0x00n, 0x01n]);

        expect(bigIntToBytes(4370n, 1)).toEqual([0x12n]);
        expect(bigIntToBytes(4370n, 2)).toEqual([0x12n, 0x11n]);
        expect(bigIntToBytes(4370n, 3)).toEqual([0x12n, 0x11n, 0x00n]);

        expect(bigIntToBytes(-2n, 2)).toEqual([0xFEn, 0xFFn]);
    });

    it('should return bytes for large Integer', () => {
        expect(bigIntToBytes(0xFF_FF_FF_FEn)).toEqual([0xFEn, 0xFFn, 0xFFn, 0xFFn]);
        expect(bigIntToBytes(0xFF_FF_FF_FAn)).toEqual([0xFAn, 0xFFn, 0xFFn, 0xFFn]);
        expect(bigIntToBytes(0xFF_FF_FF_FFn)).toEqual([0xFFn, 0xFFn, 0xFFn, 0xFFn]);
        expect(bigIntToBytes(-0xFF_FF_FF_FFn, 8)).toEqual([0x01n, 0x00n, 0x00n, 0x00n, 0xFFn, 0xFFn, 0xFFn, 0xFFn]);
        expect(bigIntToBytes(-0xFF_FF_FFn, 4)).toEqual([0x01n, 0x00n, 0x00n, 0xFFn]);
    });

    it('should throw an error on using negative number without byteSize', () => {
        expect(() => {
            bigIntToBytes(-42n);
        }).toThrowError('byteSize param should be provided for negative bigInt -42');
    });
});