import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { integerToBytes } from '../converter/integerToBytes';
import { isSet } from '../utils/vars/isSet';
import { encode } from './encode';

const EMPTY_SET_BYTE = ETypeByteCode.Set & 0b1111_0000;

export const encodeSet = (set: Set<any>, options: IEncodeOptions): number => {
    if (!isSet(set)) {
        throw new Error(`Expecting "set" type, received "${set}" (${typeof set})`);
    }

    const writer = options.writer;

    if (set.size === 0) {
        return writer.pushByte(EMPTY_SET_BYTE);
    }

    if (set.size > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided set has too many items, limit ${MAX_7_BYTES_INTEGER}, received ${set.size}`);
    }

    const sizeBytes = integerToBytes(set.size);

    // type byte
    writer.pushByte(
        ETypeByteCode.Set
        | (0b0000_0111 & sizeBytes.length)
    );

    // count
    writer.pushBytes(sizeBytes);

    set.forEach((value) => {
        encode(value, options);
    });

    return writer.getOffset();
};
