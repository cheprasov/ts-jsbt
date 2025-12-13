import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { getFilledItemsCount } from '../utils/arrays/getFilledItemsCount';
import { encodeEmptyValue } from './encodeEmptyValue';
import { encodeInteger } from './encodeInteger';
import { encode } from './encode';

const EMPTY_ARRAY_BYTE_CHAR = ETypeByteCode.Array & 0b1111_0000;

const SPARSE_RATE = 0.5;

export const encodeArray = (arr: any[], options: IEncodeOptions): number => {
    if (!Array.isArray(arr)) {
        throw new Error(`Expecting "array" type, received "${arr}" (${typeof arr})`);
    }
    const writer = options.writer;
    if (arr.length === 0) {
        return writer.pushByte(EMPTY_ARRAY_BYTE_CHAR);
    }

    if (arr.length > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided array has too large length, limit ${MAX_7_BYTES_INTEGER}, received ${arr.length}`);
    }

    const filledCount = getFilledItemsCount(arr);
    const isSparseEncoding = filledCount / arr.length < SPARSE_RATE;
    const bytes = integerToBytes(arr.length);

    // type byte
    writer.pushByte(
        ETypeByteCode.Array |
        ((0b0000_0111 & bytes.length) | (isSparseEncoding ? 0b0000_1000 : 0))
    );

    // length
    writer.pushBytes(bytes);

    if (isSparseEncoding) {
        // Sparse Array Encoding
        // Encode only filled items with keys

        // Items count
        const countBytes = integerToBytes(filledCount, bytes.length);
        writer.pushBytes(countBytes);

        arr.forEach((item, index) => {
            encodeInteger(index, writer);
            encode(item, options);
        });
    } else {
        // Dense Array Encoding
        // Encode all items including Empty Values
        for (let i = 0; i < arr.length; i += 1) {
            const isEmptyValue = !(String(i) in arr);
            if (isEmptyValue) {
                encodeEmptyValue(writer);
            } else {
                encode(arr[i], options);
            }
        }
    }

    return writer.getOffset();
};
