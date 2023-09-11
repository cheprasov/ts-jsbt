import { encodeArray } from './encodeArray';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';

describe('encodeArray', () => {
    it('should encode dense array correct', () => {
        expectAsBinaryString(encodeArray([])).toBe('01010000');
        expectAsBinaryString(encodeArray([1, 2, 3])).toBe(
            '01010001 00000011 00100001 00000001 00100001 00000010 00100001 00000011'
        );

        expectAsBinaryString(encodeArray([[1, 2, 3], [4], [5, 6]])).toBe(
            // root array
            '01010001 00000011 ' +
            // [1, 2, 3]
            '01010001 00000011 00100001 00000001 00100001 00000010 00100001 00000011 ' +
            // [4]
            '01010001 00000001 00100001 00000100 ' +
            // [5, 6]
            '01010001 00000010 00100001 00000101 00100001 00000110'
        );
    });

    it('should encode sparse array correct', () => {
        expectAsBinaryString(encodeArray([1, , 3])).toBe(
            '01010001 00000011 00100001 00000001 00000111 00100001 00000011'
        );
        expectAsBinaryString(encodeArray([, , 3])).toBe(
            '01011001 00000011 00000001 00100001 00000010 00100001 00000011'
        );

        expectAsBinaryString(encodeArray([[1, , 3], , [5, 6]])).toBe(
            // root array
            '01010001 00000011 ' +
            // [1, , 3]
            '01010001 00000011 00100001 00000001 00000111 00100001 00000011 ' +
            // empty
            '00000111 ' +
            // [5, 6]
            '01010001 00000010 00100001 00000101 00100001 00000110'
        );
    });

    it('should throw error on incorrect type', () => {
        expect(() => {
            encodeArray({ a: 1 } as any);
        }).toThrowError();
    });
});
