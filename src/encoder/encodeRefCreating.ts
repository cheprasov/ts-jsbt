import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { toChar } from '../utils/toChar';
import { integerToBytes } from '../converter/integerToBytes';


export const encodeRefCreating = (values: string[], options?: IEncodeOptions): string => {
    if (!Array.isArray(values)) {
        throw new Error(`Expecting "array" type, received "${values}" (${typeof values})`);
    }
    if (values.length > MAX_7_BYTES_INTEGER) {
        throw new Error(`Too many ref items`);
    }

    const msg: string[] = [];
    const bytes = integerToBytes(values.length);

    // type byte
    msg.push(toChar(ETypeByteCode.Refs | (0b0000_0111 & bytes.length)));
    // encode bytes
    msg.push(toChar(...bytes));
    return msg.join('') + values.join('');
};
