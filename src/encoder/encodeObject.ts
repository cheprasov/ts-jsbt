import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { TObject } from '../types/TObject';
import { isObject } from '../utils/vars/isObject';
import { integerToBytes } from '../converter/integerToBytes';
import { encode } from './encode';
import { BytesWriter } from '../writer/BytesWriter';

const EMPTY_OBJECT_BYTE = ETypeByteCode.Object & 0b1111_0000;

export const encodeObject = (obj: TObject, options: IEncodeOptions): number => {
    if (!isObject(obj)) {
        throw new Error(`Expecting "object" type, received "${obj}" (${typeof obj})`);
    }

    const writer = options.writer;
    const bodyWriter = new BytesWriter();

    let count = 0;

    options.writer = bodyWriter;

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        encode(key, options);
        encode(obj[key], options);
        count += 1;
    }

    for (const sym of Object.getOwnPropertySymbols(obj)) {
        encode(sym, options);
        encode(obj[sym], options);
        count += 1;
    }

    options.writer = writer;

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
    return writer.pushBytes(bodyWriter.getSubBytes(0));
};
