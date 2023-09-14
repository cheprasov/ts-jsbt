import { ETypeByteCode } from '../enums/ETypeByteCode';
import { JSBT } from '../JSBT';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { getFilledItemsCount } from '../utils/arrays/getFilledItemsCount';
import { toChar } from '../utils/toChar';
import { encodeEmptyValue } from './encodeEmptyValue';
import { encodeInteger } from './encodeInteger';

const EMPTY_ARRAY_BYTE_CHAR = toChar(ETypeByteCode.Array & 0b1111_0000);

const SPARSE_RATE = 0.5;

export const encodeArray = (arr: any[], options?: IEncodeOptions): string => {
    if (!Array.isArray(arr)) {
        throw new Error(`Expecting "array" type, received "${arr}" (${typeof arr})`);
    }

    if (arr.length === 0) {
        return EMPTY_ARRAY_BYTE_CHAR;
    }

    if (arr.length > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided array has too large length, limit ${MAX_7_BYTES_INTEGER}, received ${arr.length}`);
    }

    const filledCount = getFilledItemsCount(arr);
    const isSparseEncoding = filledCount / arr.length < SPARSE_RATE;
    const bytes = integerToBytes(arr.length);

    const msg: string[] = [];

    // type byte
    msg.push(toChar(
        ETypeByteCode.Array
        | ((0b0000_0111 & bytes.length)
        | (isSparseEncoding ? 0b0000_1000 : 0))
    ));

    // length
    msg.push(toChar(...bytes));

    if (isSparseEncoding) {
        // Sparse Array Encoding
        // Encode only filled items with keys

        // Items count
        const countBytes = integerToBytes(filledCount, bytes.length);
        msg.push(toChar(...countBytes));

        arr.forEach((item, index) => {
            msg.push(encodeInteger(index));
            msg.push(JSBT.encode(item, options));
        });
    } else {
        // Dense Array Encoding
        // Encode all items including Empty Values
        for (let i = 0; i < arr.length; i += 1) {
            const isEmptyValue = !(String(i) in arr);
            msg.push(isEmptyValue ? encodeEmptyValue() : JSBT.encode(arr[i], options));
        }
    }

    return msg.join('');
};
