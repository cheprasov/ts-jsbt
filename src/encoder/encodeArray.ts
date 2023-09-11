import { ETypeByteCode } from '../ETypeByteCode';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { getFilledItemsCount } from '../utils/arrays/getFilledItemsCount';
import { toCode } from '../utils/toCode';

const EMPTY_ARRAY_BYTE_CHAR = toCode(ETypeByteCode.Array & 0b1111_0000);

const SPARSE_RATE = 0.5;

export const encodeArray = (arr: any[], options: IEncodeOptions): string => {
    if (!Array.isArray(arr)) {
        throw new Error(`Expecting "array" type, received "${arr}" (${typeof arr})`);
    }

    if (arr.length === 0) {
        return EMPTY_ARRAY_BYTE_CHAR;
    }

    const filledCount = getFilledItemsCount(arr);
    const isSparseArray = filledCount / arr.length < SPARSE_RATE;


    return;
}