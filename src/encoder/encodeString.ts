import { ETypeByteCode } from '../ETypeByteCode';
import { toCode } from '../utils/toCode';
import { getBytesFromInteger } from './getBytesFromInteger';
import { getBytesSizeForInteger } from './getBytesSizeForInteger';
import { getBytesSizeForString } from './getBytesSizeForString';

const EMPTY_STRING_BYTE_CHAR = toCode(ETypeByteCode.String & 0b1111_0000)

const MAX_BYTES_SIZE = (256 ** 7) - 1;

export const encodeString = (value: string): string => {
    if (typeof value !== 'string') {
        throw new Error(`Expecting "string" type, received "${value}" (${typeof value})`);
    }
    if (value === '') {
        return EMPTY_STRING_BYTE_CHAR;
    }
    const msg: string[] = [];

    const bytesSize = getBytesSizeForString(value);
    if (bytesSize > MAX_BYTES_SIZE) {
        throw new Error(`Too large string. ${bytesSize} bytes, max ${MAX_BYTES_SIZE}`);
    }
    const bytesLen = getBytesSizeForInteger(bytesSize);
    // type byte
    msg.push(toCode(ETypeByteCode.String | (0b0000_0111 & bytesLen)));
    msg.push(toCode(...getBytesFromInteger(bytesSize, bytesLen, false)));
    msg.push(value);

    return msg.join('');
}