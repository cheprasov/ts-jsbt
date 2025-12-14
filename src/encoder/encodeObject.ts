import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { TObject } from '../types/TObject';
import { isObject } from '../utils/vars/isObject';
import { toChar } from '../utils/toChar';
import { integerToBytes } from '../converter/integerToBytes';
import { encode } from './encode';

const EMPTY_OBJECT_BYTE_CHAR = toChar(ETypeByteCode.Object & 0b1111_0000);

export const encodeObject = (obj: TObject, options: IEncodeOptions): string => {
    if (!isObject(obj)) {
        throw new Error(`Expecting "object" type, received "${obj}" (${typeof obj})`);
    }

    const keys = Object.keys(obj);
    const syms = Object.getOwnPropertySymbols(obj);
    let count = keys.length + syms.length;

    if (count === 0) {
        return EMPTY_OBJECT_BYTE_CHAR;
    }
    if (count > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided object has too many props, limit ${MAX_7_BYTES_INTEGER}, received ${count}`);
    }

    const countBytes = integerToBytes(count);
    const msg: string[] = [];

    // type byte
    msg.push(toChar(
        ETypeByteCode.Object
        | (0b0000_0111 & countBytes.length)
    ));

    // length
    msg.push(toChar(...countBytes));

    for (const key of keys) {
        msg.push(encode(key, options));
        msg.push(encode(obj[key], options));
    }

    for (const sym of syms) {
        msg.push(encode(sym, options));
        msg.push(encode(obj[sym], options));
    }

    return msg.join('');
};
