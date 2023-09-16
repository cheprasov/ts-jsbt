import { JSBT } from '../JSBT';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { TTypedArray } from '../types/TTypedArray';
import { toChar } from '../utils/toChar';
import { isTypedArray } from '../utils/vars/isTypedArray';
import { encodeEmptyValue } from './encodeEmptyValue';
import { encodeInteger } from './encodeInteger';
import { getBytesPerElement } from '../utils/typedArrays/getTypedArrayByteCount';
import { ETypedArrayByteCode } from '../enums/ETypedArrayByteCode';
import { getFilledItemsCount } from '../utils/typedArrays/getFilledItemsCount';
import { calculateByteCountVariants } from '../utils/typedArrays/calculateByteCountVariants';

const TYPED_ARRAY_CHAR_BY_NAME = {
    ArrayBuffer:       ETypedArrayByteCode.ArrayBuffer,
    Int8Array:         ETypedArrayByteCode.Int8Array,
    Uint8Array:        ETypedArrayByteCode.Uint8Array,
    Uint8ClampedArray: ETypedArrayByteCode.Uint8ClampedArray,
    Int16Array:        ETypedArrayByteCode.Int16Array,
    Uint16Array:       ETypedArrayByteCode.Uint16Array,
    Int32Array:        ETypedArrayByteCode.Int32Array,
    Uint32Array:       ETypedArrayByteCode.Uint32Array,
    Float32Array:      ETypedArrayByteCode.Float32Array,
    Float64Array:      ETypedArrayByteCode.Float64Array,
    BigInt64Array:     ETypedArrayByteCode.BigInt64Array,
    BigUint64Array:    ETypedArrayByteCode.BigUint64Array,
} as const;

export const encodeTypedArray = (arr: TTypedArray, options?: IEncodeOptions): string => {
    if (!isTypedArray(arr)) {
        throw new Error(`Expecting "typedArray" type, received "${arr}" (${typeof arr})`);
    }

    const name = arr.constructor.name as keyof typeof TYPED_ARRAY_CHAR_BY_NAME;
    const typeCode = TYPED_ARRAY_CHAR_BY_NAME[name];

    if (arr.byteLength === 0) {
        return toChar(typeCode, 0b0000_0000);
    }

    // TODO: various size
    const bytesPerElement = getBytesPerElement(arr);
    const definedItemsCount = getFilledItemsCount(arr);
    const length = arr.byteLength;

    if (length > MAX_7_BYTES_INTEGER) {
        throw new Error(`Provided typed array has too large length, limit ${MAX_7_BYTES_INTEGER}, received ${length}`);
    }
    const msg: string[] = [];

    const calculation = calculateByteCountVariants(arr);
    const isValueEncoder = calculation.envValueSize <= calculation.encKeyValueSize;

    // type byte
    msg.push(toChar(typeCode));

    // rsv / endoding / length / items count
    msg.push(toChar(

    ));


    return msg.join('');
};
