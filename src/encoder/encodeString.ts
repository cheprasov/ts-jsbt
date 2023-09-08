import { ETypeByteCode } from '../ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { toCode } from '../utils/toCode';
import { integerToBytes } from './integerToBytes';
import { getBytesSizeForInteger } from './getBytesSizeForInteger';
import { getBytesSizeForString } from './getBytesSizeForString';

const EMPTY_STRING_BYTE_CHAR = toCode(ETypeByteCode.String & 0b1111_0000);

export const encodeString = (value: string): string => {
    if (typeof value !== 'string') {
        throw new Error(`Expecting "string" type, received "${value}" (${typeof value})`);
    }
    if (value === '') {
        return EMPTY_STRING_BYTE_CHAR;
    }
    const msg: string[] = [];

    const bytesSize = getBytesSizeForString(value);
    if (bytesSize > MAX_7_BYTES_INTEGER) {
        throw new Error(`Too large string. ${bytesSize} bytes, limit ${MAX_7_BYTES_INTEGER}`);
    }
    const bytesLen = getBytesSizeForInteger(bytesSize);
    // type byte
    msg.push(toCode(ETypeByteCode.String | (0b0000_0111 & bytesLen)));
    // length bytes
    msg.push(toCode(...integerToBytes(bytesSize, bytesLen, false)));
    // encode bytes
    msg.push(value);

    return msg.join('');
}