import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { integersToArrayBuffer } from '../converter/integersToArrayBuffer';
import { BytesWriter } from '../writer/BytesWriter';
import { encodeTypedArray } from './encodeTypedArray';

describe('encodeTypedArray', () => {
    it('should encode TypeArray correctly', () => {
        let writer = new BytesWriter();
        encodeTypedArray(new Int8Array([]), writer);
        expectAsBinaryString(writer.toString()).toEqual('01100001 00000000');

        writer = new BytesWriter();
        encodeTypedArray(new Uint32Array([]), writer);
        expectAsBinaryString(writer.toString()).toEqual('01100111 00000000');

        writer = new BytesWriter();
        encodeTypedArray(new Int8Array([-1, 2, 3]), writer);
        expectAsBinaryString(writer.toString()).toEqual(
            '01100001 00000001 00000011 11111111 00000010 00000011'
        );

        writer = new BytesWriter();
        encodeTypedArray(new Int8Array([0, 2, 3]), writer);
        expectAsBinaryString(writer.toString()).toEqual(
            '01100001 00000001 00000011 00000000 00000010 00000011'
        );

        writer = new BytesWriter();
        encodeTypedArray(new Int16Array([258, 1, -3]), writer);
        expectAsBinaryString(writer.toString()).toEqual(
            '01100100 00000001 00000011 00000010 00000001 00000001 00000000 11111101 11111111'
        );

        writer = new BytesWriter();
        encodeTypedArray(new Int16Array([0, 258, 0, 0, 0, -3]), writer);
        expectAsBinaryString(writer.toString()).toEqual(
            '01100100 01001001 00001100 00000010 ' +
            // Integer 1 + 258
            '00100001 00000001 ' + '00000010 00000001 ' +
            // <Integer 5> + -3
            '00100001 00000101 ' + '11111101 11111111'
        );

        writer = new BytesWriter();
        encodeTypedArray(new Int16Array([0, 258, 0, 0, 0, -3]), writer);
        expectAsBinaryString(writer.toString()).toEqual(
            '01100100 01001001 00001100 00000010 ' +
            // Integer 1 + 258
            '00100001 00000001 ' + '00000010 00000001 ' +
            // <Integer 5> + -3
            '00100001 00000101 ' + '11111101 11111111'
        );

        writer = new BytesWriter();
        encodeTypedArray(integersToArrayBuffer([0, 1, 2, 200, 255, 255]), writer);
        expectAsBinaryString(writer.toString()).toEqual(
            '01100000 00000001 00000110 00000000 00000001 00000010 11001000 11111111 11111111'
        );
    });
});
