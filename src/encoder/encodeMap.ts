import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { integerToBytes } from '../converter/integerToBytes';
import { isMap } from '../utils/vars/isMap';
import { encode } from './encode';

const EMPTY_MAP_BYTE = ETypeByteCode.Map & 0b1111_0000;

export const encodeMap = (map: Map<any, any>, options: IEncodeOptions): number => {
    if (!isMap(map)) {
        throw new Error(`Expecting "map" type, received "${map}" (${typeof map})`);
    }

    const writer = options.writer;

    if (map.size === 0) {
        return writer.pushByte(EMPTY_MAP_BYTE);
    }

    if (map.size > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided map has too many items, limit ${MAX_7_BYTES_INTEGER}, received ${map.size}`);
    }

    const sizeBytes = integerToBytes(map.size);

    // type byte
    writer.pushByte(
        ETypeByteCode.Map
        | (0b0000_0111 & sizeBytes.length)
    );

    // count
    writer.pushBytes(sizeBytes);

    map.forEach((value, key) => {
        encode(key, options);
        encode(value, options);
    });

    return writer.getOffset();
};
