import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { TObject } from '../types/TObject';
import { integerToBytes } from '../converter/integerToBytes';
import { encode } from './encode';
import { isClassInstance } from '../utils/vars/isClassInstance';
import { BytesWriter } from '../writer/BytesWriter';

export const encodeClassInstance = (obj: TObject, options: IEncodeOptions): number => {
    if (!isClassInstance(obj)) {
        throw new Error(`Expecting "object" type, received "${obj}" (${typeof obj})`);
    }
    const props =
        typeof obj?.toJSBT === 'function'
            ? obj.toJSBT()
            : typeof obj?.toJSON === 'function'
                ? obj.toJSON()
                : obj.valueOf();

    const writer = options.writer;
    const bodyWriter = new BytesWriter()
    options.writer = bodyWriter;

    let count = 0;

    // constructor name
    const constructorNameKey = options.objects.classInstanceConstructorNameKey;
    const constructorName =
        (constructorNameKey && (props[constructorNameKey] || obj[constructorNameKey])) || obj?.constructor?.name || '';
    encode(constructorName, options);

    for (const key in props) {
        if (!props.hasOwnProperty(key)) {
            continue;
        }
        encode(key, options);
        encode(props[key], options);
        count += 1;
    }

    for (const sym of Object.getOwnPropertySymbols(props)) {
        encode(sym, options);
        encode(props[sym], options);
        count += 1;
    }

    if (count > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided object has too many props, limit ${MAX_7_BYTES_INTEGER}, received ${count}`);
    }

    options.writer = writer;
    const countBytes = integerToBytes(count);

    // type byte
    writer.pushByte(
        ETypeByteCode.Object |
            0b0000_1000 | // Class Instance
            (0b0000_0111 & countBytes.length)
    );

    // length
    writer.pushBytes(countBytes);
    return writer.pushBytes(bodyWriter.getSubBytes(0))
};
