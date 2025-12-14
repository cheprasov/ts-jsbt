import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { TObject } from '../types/TObject';
import { isObject } from '../utils/vars/isObject';
import { integerToBytes } from '../converter/integerToBytes';
import { encode } from './encode';

const EMPTY_OBJECT_BYTE = ETypeByteCode.Object & 0b1111_0000;

export const encodeObject = (obj: TObject, options: IEncodeOptions): number => {
    if (!isObject(obj)) {
        throw new Error(`Expecting "object" type, received "${obj}" (${typeof obj})`);
    }

    const writer = options.writer;

    const keys = Object.keys(obj); // только own enumerable string keys
    const syms = Object.getOwnPropertySymbols(obj); // собственные symbols (все, enumerable/не enumerable)

    // Если тебе нужны только enumerable symbols, добавь фильтр:
    // const syms = Object.getOwnPropertySymbols(obj).filter(s => Object.prototype.propertyIsEnumerable.call(obj, s));

    const count = keys.length + syms.length;


    if (count === 0) {
        return writer.pushByte(EMPTY_OBJECT_BYTE);
    }

    if (count > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided object has too many props, limit ${MAX_7_BYTES_INTEGER}, received ${count}`);
    }

    const countBytes = integerToBytes(count);

    // type byte
    writer.pushByte(
        ETypeByteCode.Object
        | (0b0000_0111 & countBytes.length)
    );

    // length
    writer.pushBytes(countBytes);

    // for (const key in obj) {
    //     if (!obj.hasOwnProperty(key)) {
    //         continue;
    //     }
    //     encode(key, options);
    //     encode(obj[key], options);
    //     //count += 1;
    // }

    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        encode(key, options);
        encode((obj as any)[key], options);
    }

    // for (const sym of Object.getOwnPropertySymbols(obj)) {
    //     encode(sym, options);
    //     encode(obj[sym], options);
    //     //count += 1;
    // }

    for (let i = 0; i < syms.length; i += 1) {
        const sym = syms[i];
        encode(sym, options);
        encode((obj as any)[sym], options);
    }

    return writer.getOffset();

    // // type byte
    // writer.pushByte(
    //     ETypeByteCode.Object
    //     | (0b0000_0111 & countBytes.length)
    // );

    // // length
    // writer.pushBytes(countBytes);
    // return writer.pushBytes(bodyWriter.getSubBytes(0));
};
