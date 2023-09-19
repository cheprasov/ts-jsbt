import { ETypeByteCode } from '../enums/ETypeByteCode';
import { JSBT } from '../JSBT';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { TObject } from '../types/TObject';
import { isObject } from '../utils/vars/isObject';
import { toChar } from '../utils/toChar';
import { integerToBytes } from '../converter/integerToBytes';

const EMPTY_OBJECT_BYTE_CHAR = toChar(ETypeByteCode.Object & 0b1111_0000);

export const encodeObject = (obj: TObject, options?: IEncodeOptions): string => {
    if (!isObject(obj)) {
        throw new Error(`Expecting "object" type, received "${obj}" (${typeof obj})`);
    }

    const msgBody: string[] = [];
    let count = 0;

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        msgBody.push(JSBT.encode(key, options));
        msgBody.push(JSBT.encode(obj[key], options));
        count += 1;
    }

    for (const sym of Object.getOwnPropertySymbols(obj)) {
        msgBody.push(JSBT.encode(sym, options));
        msgBody.push(JSBT.encode(obj[sym], options));
        count += 1;
    }

    if (count === 0) {
        return EMPTY_OBJECT_BYTE_CHAR;
    }

    if (count > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided object has too many props, limit ${MAX_7_BYTES_INTEGER}, received ${count}`);
    }

    const msgHeaders: string[] = [];
    const countBytes = integerToBytes(count);


    // type byte
    msgHeaders.push(toChar(
        ETypeByteCode.Object
        | (0b0000_0111 & countBytes.length)
    ));

    // length
    msgHeaders.push(toChar(...countBytes));

    return msgHeaders.join('') + msgBody.join('');
};
