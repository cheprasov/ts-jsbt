import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { toChar } from '../utils/toChar';
import { integerToBytes } from '../converter/integerToBytes';
import { isMap } from '../utils/vars/isMap';
import { encode } from './encode';

const EMPTY_MAP_BYTE_CHAR = toChar(ETypeByteCode.Map & 0b1111_0000);

export const encodeMap = (map: Map<any, any>, options: IEncodeOptions): string => {
    if (!isMap(map)) {
        throw new Error(`Expecting "map" type, received "${map}" (${typeof map})`);
    }

    if (map.size === 0) {
        return EMPTY_MAP_BYTE_CHAR;
    }

    if (map.size > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided map has too many items, limit ${MAX_7_BYTES_INTEGER}, received ${map.size}`);
    }

    const sizeBytes = integerToBytes(map.size);

    const msg: string[] = [];
    // type byte
    msg.push(toChar(
        ETypeByteCode.Map
        | (0b0000_0111 & sizeBytes.length)
    ));

    // count
    msg.push(toChar(...sizeBytes));

    map.forEach((value, key) => {
        msg.push(encode(key, options));
        msg.push(encode(value, options));
    });

    return msg.join('');
};
