import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { toChar } from '../utils/toChar';

const EMPTY_STRING_BYTE_CHAR = toChar(ETypeByteCode.String & 0b1111_0000);

export const encodeString = (value: string): string => {
    if (typeof value !== 'string') {
        throw new Error(`Expecting "string" type, received "${value}" (${typeof value})`);
    }
    if (value === '') {
        return EMPTY_STRING_BYTE_CHAR;
    }
    const msg: string[] = [];

    const encoder = new TextEncoder();
    const encodeBytes = encoder.encode(value);

    if (encodeBytes.byteLength > MAX_7_BYTES_INTEGER) {
        throw new Error(`Too large string. ${encodeBytes.byteLength} bytes, limit ${MAX_7_BYTES_INTEGER}`);
    }
    const bytes = integerToBytes(encodeBytes.byteLength)
    // type byte
    msg.push(toChar(ETypeByteCode.String | (0b0000_0111 & bytes.length)));
    // length bytes
    msg.push(toChar(...bytes));
    // encode bytes
    msg.push(toChar(...encodeBytes));

    return msg.join('');
}