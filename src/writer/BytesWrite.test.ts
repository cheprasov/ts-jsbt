import { BytesWriter } from './BytesWriter';

describe('BytesWriter', () => {
    test('starts with offset 0 and finish() is empty', () => {
        const w = new BytesWriter();
        expect(w.getOffset()).toBe(0);
        expect(w.finish()).toBeInstanceOf(Uint8Array);
        expect(w.finish().length).toBe(0);
    });

    test('pushByte writes a single byte (masked to 0xff) and increments offset', () => {
        const w = new BytesWriter();

        expect(w.pushByte(0)).toBe(1);
        expect(w.getOffset()).toBe(1);

        expect(w.pushByte(255)).toBe(2);
        expect(w.getOffset()).toBe(2);

        // masking behavior
        w.pushByte(256); // 0x100 -> 0x00
        w.pushByte(-1); // -> 0xff

        const out = w.finish();
        expect(Array.from(out)).toEqual([0, 255, 0, 255]);
    });

    test('pushBytes accepts number[] and Uint8Array, returns length, increments offset', () => {
        const w = new BytesWriter();

        const a = [1, 2, 3];
        expect(w.pushBytes(a)).toBe(3);
        expect(w.getOffset()).toBe(3);

        const b = new Uint8Array([4, 5]);
        expect(w.pushBytes(b)).toBe(5);
        expect(w.getOffset()).toBe(5);

        expect(Array.from(w.finish())).toEqual([1, 2, 3, 4, 5]);
    });

    test('finish() returns only written bytes (subarray to offset)', () => {
        const w = new BytesWriter();
        w.pushBytes([10, 11, 12, 13]);

        const out = w.finish();
        expect(out.length).toBe(4);
        expect(Array.from(out)).toEqual([10, 11, 12, 13]);
    });

    test('getSubBytes returns a view (subarray) and reflects subsequent writes to underlying buffer', () => {
        const w = new BytesWriter();
        w.pushBytes([1, 2, 3, 4, 5]);

        const view = w.getSubBytes(1, 3); // [2,3,4]
        expect(Array.from(view)).toEqual([2, 3, 4]);

        // overwrite existing bytes by writing directly into the view
        // @ts-ignore

        view[1] = 99; // changes underlying buffer at absolute index 2

        expect(Array.from(w.getSubBytes(0, 5))).toEqual([1, 2, 99, 4, 5]);
    });

    test('grows buffer when needed (ensure) and preserves previously written bytes', () => {
        const w = new BytesWriter();

        // Write more than initial capacity (1024)
        const big = new Uint8Array(2000);
        for (let i = 0; i < big.length; i++) big[i] = i & 0xff;

        w.pushBytes(big);

        expect(w.getOffset()).toBe(2000);
        const out = w.finish();
        expect(out.length).toBe(2000);

        // spot-check some values
        expect(out[0]).toBe(0);
        expect(out[1]).toBe(1);
        expect(out[255]).toBe(255);
        expect(out[256]).toBe(0);
        expect(out[1999]).toBe(1999 & 0xff);
    });

    test('multiple grows still preserve all bytes in correct order', () => {
        const w = new BytesWriter();

        // 1) fill near capacity
        w.pushBytes(new Uint8Array(1020).fill(7));
        // 2) push beyond remaining space to trigger ensure
        w.pushBytes([1, 2, 3, 4, 5, 6, 8, 9, 10, 11]);

        const out = w.finish();
        expect(out.length).toBe(1030);
        expect(out[0]).toBe(7);
        expect(out[1019]).toBe(7);
        expect(Array.from(out.subarray(1020))).toEqual([1, 2, 3, 4, 5, 6, 8, 9, 10, 11]);
    });

    test('getSubBytes returns correct ranges', () => {
        const w = new BytesWriter();
        w.pushBytes([10, 20, 30, 40, 50, 60]);

        expect(Array.from(w.getSubBytes(0, 2))).toEqual([10, 20]);
        expect(Array.from(w.getSubBytes(2, 3))).toEqual([30, 40, 50]);
        expect(Array.from(w.getSubBytes(5, 1))).toEqual([60]);
        expect(Array.from(w.getSubBytes(6, 10))).toEqual([]);
        expect(Array.from(w.getSubBytes(1, 10))).toEqual([20, 30, 40, 50, 60]);
    });
});

describe('BytesWriter.getSubBytes', () => {

    test('returns bytes from offset to offset+size', () => {
        const w = new BytesWriter();
        w.pushBytes([10, 20, 30, 40, 50, 60]);

        expect(Array.from(w.getSubBytes(0, 3))).toEqual([10, 20, 30]);
        expect(Array.from(w.getSubBytes(2, 3))).toEqual([30, 40, 50]);
        expect(Array.from(w.getSubBytes(5, 1))).toEqual([60]);
    });

    test('clips size to written offset', () => {
        const w = new BytesWriter();
        w.pushBytes([1, 2, 3]);

        // request more than written
        expect(Array.from(w.getSubBytes(1, 10))).toEqual([2, 3]);
    });

    test('returns empty Uint8Array if offset is out of written range', () => {
        const w = new BytesWriter();
        w.pushBytes([1, 2, 3]);

        expect(w.getSubBytes(3, 1).length).toBe(0);
        expect(w.getSubBytes(10, 5).length).toBe(0);
    });

    test('returns bytes from offset to end when size is omitted', () => {
        const w = new BytesWriter();
        w.pushBytes([10, 20, 30, 40]);

        expect(Array.from(w.getSubBytes(1))).toEqual([20, 30, 40]);
        expect(Array.from(w.getSubBytes(0))).toEqual([10, 20, 30, 40]);
    });

    test('returns empty when writer is empty', () => {
        const w = new BytesWriter();

        expect(w.getSubBytes(0).length).toBe(0);
        expect(w.getSubBytes(5, 10).length).toBe(0);
    });

    test('returned Uint8Array is a view, not a copy', () => {
        const w = new BytesWriter();
        w.pushBytes([1, 2, 3, 4]);

        const view = w.getSubBytes(1, 2); // [2, 3]
        // @ts-ignore
        view[0] = 99;

        // underlying buffer must be affected
        expect(Array.from(w.getSubBytes(0))).toEqual([1, 99, 3, 4]);
    });

});