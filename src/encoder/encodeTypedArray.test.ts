import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { integersToArrayBuffer } from '../converter/integersToArrayBuffer';
import { encodeTypedArray } from './encodeTypedArray';

describe('encodeTypedArray', () => {
    it('should encode TypeArray correctly', () => {
        expectAsBinaryString(encodeTypedArray(new Int8Array([]))).toEqual('01100001 00000000');

        expectAsBinaryString(encodeTypedArray(new Uint32Array([]))).toEqual('01100111 00000000');

        expectAsBinaryString(encodeTypedArray(new Int8Array([-1, 2, 3]))).toEqual(
            '01100001 00000001 00000011 11111111 00000010 00000011'
        );

        expectAsBinaryString(encodeTypedArray(new Int8Array([0, 2, 3]))).toEqual(
            '01100001 00000001 00000011 00000000 00000010 00000011'
        );

        expectAsBinaryString(encodeTypedArray(new Int16Array([258, 1, -3]))).toEqual(
            '01100100 00000001 00000011 00000010 00000001 00000001 00000000 11111101 11111111'
        );

        expectAsBinaryString(encodeTypedArray(new Int16Array([0, 258, 0, 0, 0, -3]))).toEqual(
            '01100100 01001001 00001100 00000010 ' +
            // Integer 1 + 258
            '00100001 00000001 ' + '00000010 00000001 ' +
            // <Integer 5> + -3
            '00100001 00000101 ' + '11111101 11111111'
        );

        expectAsBinaryString(encodeTypedArray(new Int16Array([0, 258, 0, 0, 0, -3]))).toEqual(
            '01100100 01001001 00001100 00000010 ' +
            // Integer 1 + 258
            '00100001 00000001 ' + '00000010 00000001 ' +
            // <Integer 5> + -3
            '00100001 00000101 ' + '11111101 11111111'
        );

        expectAsBinaryString(encodeTypedArray(integersToArrayBuffer([0, 1, 2, 200, 255, 255]))).toEqual(
            '01100000 00000001 00000110 00000000 00000001 00000010 11001000 11111111 11111111'
        );
    });
});
