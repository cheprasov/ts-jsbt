import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { IDataWriter } from '../writer/IDataWriter';

const EMPTY_STRING_BYTE = ETypeByteCode.String & 0b1111_0000;

export const encodeString = (value: string, writer: IDataWriter): number => {
    if (typeof value !== 'string') {
        throw new Error(`Expecting "string" type, received "${value}" (${typeof value})`);
    }
    if (value === '') {
        return writer.pushByte(EMPTY_STRING_BYTE);
    }

    const encoder = new TextEncoder();
    const encodeBytes = encoder.encode(value);

    if (encodeBytes.byteLength > MAX_7_BYTES_INTEGER) {
        throw new Error(`Too large string. ${encodeBytes.byteLength} bytes, limit ${MAX_7_BYTES_INTEGER}`);
    }
    const bytes = integerToBytes(encodeBytes.byteLength);
    // type byte
    writer.pushByte(ETypeByteCode.String | (0b0000_0111 & bytes.length));
    // length bytes
    writer.pushBytes(bytes);
    // encode bytes
    return writer.pushBytes(encodeBytes);
}