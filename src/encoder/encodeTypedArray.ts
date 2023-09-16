import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { TTypedArray } from '../types/TTypedArray';
import { toChar } from '../utils/toChar';
import { isTypedArray } from '../utils/vars/isTypedArray';
import { encodeInteger } from './encodeInteger';
import { getBytesPerElement } from '../utils/typedArrays/getTypedArrayByteCount';
import { ETypedArrayByteCode } from '../enums/ETypedArrayByteCode';
import { getFilledItemsCount } from '../utils/typedArrays/getFilledItemsCount';
import { calculateByteCountVariants } from '../utils/typedArrays/calculateByteCountVariants';

const TYPED_ARRAY_CHAR_BY_NAME = {
    ArrayBuffer: ETypedArrayByteCode.ArrayBuffer,
    Int8Array: ETypedArrayByteCode.Int8Array,
    Uint8Array: ETypedArrayByteCode.Uint8Array,
    Uint8ClampedArray: ETypedArrayByteCode.Uint8ClampedArray,
    Int16Array: ETypedArrayByteCode.Int16Array,
    Uint16Array: ETypedArrayByteCode.Uint16Array,
    Int32Array: ETypedArrayByteCode.Int32Array,
    Uint32Array: ETypedArrayByteCode.Uint32Array,
    Float32Array: ETypedArrayByteCode.Float32Array,
    Float64Array: ETypedArrayByteCode.Float64Array,
    BigInt64Array: ETypedArrayByteCode.BigInt64Array,
    BigUint64Array: ETypedArrayByteCode.BigUint64Array,
} as const;

export const encodeTypedArray = (tarr: TTypedArray, options?: IEncodeOptions): string => {
    if (!isTypedArray(tarr)) {
        throw new Error(`Expecting "typedArray" type, received "${tarr}" (${typeof tarr})`);
    }

    const name = tarr.constructor.name as keyof typeof TYPED_ARRAY_CHAR_BY_NAME;
    const typeCode = TYPED_ARRAY_CHAR_BY_NAME[name];

    if (tarr.byteLength === 0) {
        return toChar(typeCode, 0b0000_0000);
    }

    // TODO: various size
    const bytesPerElement = getBytesPerElement(tarr);
    const definedItemsCount = getFilledItemsCount(tarr);

    if (tarr.byteLength > MAX_7_BYTES_INTEGER) {
        throw new Error(
            `Provided typed array has too large length, limit ${MAX_7_BYTES_INTEGER}, received ${tarr.byteLength}`
        );
    }
    const msg: string[] = [];

    const calculation = calculateByteCountVariants(tarr);
    const isValueEncoding = calculation.envValueSize <= calculation.encKeyValueSize;
    const isDenseArray = definedItemsCount * bytesPerElement === tarr.byteLength;

    // type byte
    msg.push(toChar(typeCode));

    // rsv / endoding / length / items count
    const lenBytes = integerToBytes(tarr.byteLength);
    const defLenBytes = integerToBytes(definedItemsCount);
    msg.push(
        toChar(
            0b0000_0000 |
                (isValueEncoding ? 0 : 0b0_1_000000) |
                (isDenseArray ? 0 : (0b00000_111 & lenBytes.length) << 3) |
                (0b00000_111 & defLenBytes.length)
        )
    );

    // length
    if (!isDenseArray) {
        msg.push(toChar(...lenBytes));
    }

    // items count
    msg.push(toChar(...defLenBytes));

    if (isValueEncoding) {
        const uint8arr = new Uint8Array(tarr instanceof ArrayBuffer ? tarr : tarr.buffer);
        msg.push(toChar(...uint8arr));
    } else {
        const arr = tarr instanceof ArrayBuffer ? new Uint8Array(tarr) : tarr;
        for (let i = 0; i < arr.length; i += 1) {
            const num = arr[i];
            if (num) {
                const uint8arr = new Uint8Array(arr.buffer, i * bytesPerElement, bytesPerElement);
                msg.push(encodeInteger(i));
                msg.push(toChar(...uint8arr));
            }
        }
    }

    return msg.join('');
};
