import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { TTypedArray } from '../types/TTypedArray';
import { isTypedArray } from '../utils/vars/isTypedArray';
import { encodeInteger } from './encodeInteger';
import { getBytesPerElement } from '../utils/typedArrays/getTypedArrayByteCount';
import { ETypedArrayByteCode } from '../enums/ETypedArrayByteCode';
import { getFilledItemsCount } from '../utils/typedArrays/getFilledItemsCount';
import { calculateByteCountVariants } from '../utils/typedArrays/calculateByteCountVariants';
import { IDataWriter } from '../writer/IDataWriter';

const TYPED_ARRAY_BYTE_BY_NAME = {
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

export const encodeTypedArray = (tarr: TTypedArray | ArrayBuffer, writer: IDataWriter): number => {
    if (!isTypedArray(tarr)) {
        throw new Error(`Expecting "typedArray" type, received "${tarr}" (${typeof tarr})`);
    }

    const name = tarr.constructor.name as keyof typeof TYPED_ARRAY_BYTE_BY_NAME;
    const typeCode = TYPED_ARRAY_BYTE_BY_NAME[name];

    if (tarr.byteLength === 0) {
        writer.pushByte(typeCode);
        return writer.pushByte(0b0000_0000);
    }

    const arr = tarr instanceof ArrayBuffer ? new Uint8Array(tarr) : tarr;

    // TODO: various size
    const bytesPerElement = getBytesPerElement(tarr);
    const definedItemsCount = getFilledItemsCount(tarr);

    if (tarr.byteLength > MAX_7_BYTES_INTEGER) {
        throw new Error(
            `Provided typed array has too large length, limit ${MAX_7_BYTES_INTEGER}, received ${tarr.byteLength}`
        );
    }

    const calculation = calculateByteCountVariants(tarr);
    const isValueEncoding = calculation.envValueSize <= calculation.encKeyValueSize;

    // type byte
    writer.pushByte(typeCode);

    // rsv / endoding / length / items count
    const byteLenBytes = integerToBytes(tarr.byteLength);
    const lenBytes = integerToBytes(arr.length);
    const defCountBytes = integerToBytes(definedItemsCount);
    writer.pushByte(
        0b0000_0000 |
            (isValueEncoding ? 0 : 0b0_1_000000) |
            (isValueEncoding ? 0 : (0b00000_111 & byteLenBytes.length) << 3) |
            (isValueEncoding ? (0b00000_111 & lenBytes.length) : (0b00000_111 & defCountBytes.length))
    );

    if (isValueEncoding) {
        // items count
        writer.pushBytes(lenBytes);
        const uint8arr = new Uint8Array(tarr instanceof ArrayBuffer ? tarr : tarr.buffer);
        writer.pushBytes(uint8arr);
    } else {
        // length
        writer.pushBytes(byteLenBytes);
        writer.pushBytes(defCountBytes);
        for (let i = 0; i < arr.length; i += 1) {
            const num = arr[i];
            if (num) {
                const uint8arr = new Uint8Array(arr.buffer, i * bytesPerElement, bytesPerElement);
                encodeInteger(i, writer)
                writer.pushBytes(uint8arr);
            }
        }
    }

    return writer.getOffset();
};
