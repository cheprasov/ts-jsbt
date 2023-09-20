import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { toChar } from '../utils/toChar';
import { integerToBytes } from '../converter/integerToBytes';
import { isSet } from '../utils/vars/isSet';
import { encode } from './encode';

const EMPTY_SET_BYTE_CHAR = toChar(ETypeByteCode.Set & 0b1111_0000);

export const encodeSet = (set: Set<any>, options: IEncodeOptions): string => {
    if (!isSet(set)) {
        throw new Error(`Expecting "set" type, received "${set}" (${typeof set})`);
    }

    if (set.size === 0) {
        return EMPTY_SET_BYTE_CHAR;
    }

    if (set.size > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided set has too many items, limit ${MAX_7_BYTES_INTEGER}, received ${set.size}`);
    }

    const sizeBytes = integerToBytes(set.size);

    const msg: string[] = [];
    // type byte
    msg.push(toChar(
        ETypeByteCode.Set
        | (0b0000_0111 & sizeBytes.length)
    ));

    // count
    msg.push(toChar(...sizeBytes));

    set.forEach((value) => {
        msg.push(encode(value, options));
    });

    return msg.join('');
};
