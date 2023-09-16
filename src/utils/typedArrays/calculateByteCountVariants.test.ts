import { calculateByteCountVariants } from './calculateByteCountVariants';

const newBuffer = (ints: number[]): ArrayBuffer => {
    return new Uint8ClampedArray(ints).buffer;
};

describe('calculateByteCountVariants', () => {
    it('should calculate byte sizes correct for Uint8Array', () => {
        expect(calculateByteCountVariants(new Uint8Array(newBuffer([])))).toEqual({
            envValueSize: 0,
            encKeyValueSize: 0,
        });

        expect(calculateByteCountVariants(new Uint8Array(newBuffer([1, 2, 3])))).toEqual({
            envValueSize: 3,
            encKeyValueSize: 2 * 3 - 1 + 3,
        });

        expect(calculateByteCountVariants(new Uint8Array(newBuffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])))).toEqual({
            envValueSize: 10,
            encKeyValueSize: 2 * 10 - 1 + 10,
        });

        expect(calculateByteCountVariants(new Uint8Array(newBuffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])))).toEqual({
            envValueSize: 10,
            encKeyValueSize: 0,
        });

        expect(calculateByteCountVariants(new Uint8Array(newBuffer([10, 0, 0, 0, 0, 0, 0, 0, 0, 0])))).toEqual({
            envValueSize: 10,
            encKeyValueSize: 2 - 1 + 1,
        });

        expect(calculateByteCountVariants(new Uint8Array(newBuffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 10])))).toEqual({
            envValueSize: 10,
            encKeyValueSize: 2 + 1,
        });

        expect(calculateByteCountVariants(new Uint8Array(newBuffer([10, 0, 0, 0, 0, 0, 0, 0, 0, 10])))).toEqual({
            envValueSize: 10,
            encKeyValueSize: 2 * 2 - 1 + 2,
        });
    });

    it('should calculate byte sizes correct for Uint16Array', () => {
        expect(calculateByteCountVariants(new Uint16Array(newBuffer([])))).toEqual({
            envValueSize: 0,
            encKeyValueSize: 0,
        });

        expect(calculateByteCountVariants(new Uint16Array(newBuffer([1, 0, 1, 0])))).toEqual({
            envValueSize: 2 * 2,
            encKeyValueSize: 2 * 2 - 1 + 2 * 2,
        });

        expect(calculateByteCountVariants(new Uint16Array(newBuffer([1, 0, 1, 0, 1, 0, 1, 0])))).toEqual({
            envValueSize: 4 * 2,
            encKeyValueSize: 4 * 2 - 1 + 4 * 2,
        });

        expect(calculateByteCountVariants(new Uint16Array(newBuffer([0, 0, 0, 0, 1, 0, 1, 0])))).toEqual({
            envValueSize: 4 * 2,
            encKeyValueSize: 2 * 2 + 2 * 2,
        });

        expect(calculateByteCountVariants(new Uint16Array(newBuffer([1, 0, 0, 0, 0, 0, 0, 0])))).toEqual({
            envValueSize: 4 * 2,
            encKeyValueSize: 1 + 2,
        });

        expect(calculateByteCountVariants(new Uint16Array(newBuffer([0, 0, 0, 0, 0, 0, 0, 0])))).toEqual({
            envValueSize: 4 * 2,
            encKeyValueSize: 0,
        });
    });
});
