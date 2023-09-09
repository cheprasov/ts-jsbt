import { ETypeByteCode } from '../ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { getBytesSizeForString } from '../converter/getBytesSizeForString';
import { integerToBytes } from '../converter/integerToBytes';
import { toCode } from '../utils/toCode';

const EMPTY_STRING_BYTE_CHAR = toCode(ETypeByteCode.String & 0b1111_0000);

export const encodeString = (value: string): string => {
    if (typeof value !== 'string') {
        throw new Error(`Expecting "string" type, received "${value}" (${typeof value})`);
    }
    if (value === '') {
        return EMPTY_STRING_BYTE_CHAR;
    }
    const msg: string[] = [];

    const bytesCount = getBytesSizeForString(value);
    if (bytesCount > MAX_7_BYTES_INTEGER) {
        throw new Error(`Too large string. ${bytesCount} bytes, limit ${MAX_7_BYTES_INTEGER}`);
    }
    const bytes = integerToBytes(bytesCount)
    // type byte
    msg.push(toCode(ETypeByteCode.String | (0b0000_0111 & bytes.length)));
    // length bytes
    msg.push(toCode(...bytes));
    // encode bytes
    msg.push(value);

    return msg.join('');
}