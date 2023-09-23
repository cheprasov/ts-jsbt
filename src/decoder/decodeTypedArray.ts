import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import { ETypedArrayByteCode } from '../enums/ETypedArrayByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { TDataViewGetter } from '../types/TDataViewGetter';
import { TTypedArray } from '../types/TTypedArray';
import { getBytesPerElement } from '../utils/typedArrays/getTypedArrayByteCount';
import { decodeInteger } from './decodeInteger';

export type TTypedArrayConstructor = {
    new (init: number): TTypedArray;
};

const typedArrayConstructorByType: Record<number, TTypedArrayConstructor> = {
    [ETypedArrayByteCode.ArrayBuffer]: Uint8Array,
    [ETypedArrayByteCode.Int8Array]: Int8Array,
    [ETypedArrayByteCode.Uint8Array]: Uint8Array,
    [ETypedArrayByteCode.Uint8ClampedArray]: Uint8ClampedArray,
    [ETypedArrayByteCode.Int16Array]: Int16Array,
    [ETypedArrayByteCode.Uint16Array]: Uint16Array,
    [ETypedArrayByteCode.Int32Array]: Int32Array,
    [ETypedArrayByteCode.Uint32Array]: Uint32Array,
    [ETypedArrayByteCode.Float32Array]: Float32Array,
    [ETypedArrayByteCode.Float64Array]: Float64Array,
    [ETypedArrayByteCode.BigInt64Array]: BigInt64Array,
    [ETypedArrayByteCode.BigUint64Array]: BigInt64Array,
};

const dataViewGetter: Record<number, TDataViewGetter> = {
    [ETypedArrayByteCode.ArrayBuffer]: 'getUint8',
    [ETypedArrayByteCode.Int8Array]: 'getInt8',
    [ETypedArrayByteCode.Uint8Array]: 'getUint8',
    [ETypedArrayByteCode.Uint8ClampedArray]: 'getUint8',
    [ETypedArrayByteCode.Int16Array]: 'getInt16',
    [ETypedArrayByteCode.Uint16Array]: 'getUint16',
    [ETypedArrayByteCode.Int32Array]: 'getInt32',
    [ETypedArrayByteCode.Uint32Array]: 'getUint32',
    [ETypedArrayByteCode.Float32Array]: 'getFloat32',
    [ETypedArrayByteCode.Float64Array]: 'getFloat64',
    [ETypedArrayByteCode.BigInt64Array]: 'getBigInt64',
    [ETypedArrayByteCode.BigUint64Array]: 'getBigInt64',
};

export const decodeTypedArray = (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions
): TTypedArray | ArrayBuffer => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Typed_Array) {
        throw new Error(`Provaded incorrect type ${typeByte} for decode typed array`);
    }
    const secondByte = stream.readByte();
    const isKeyValueEncoding = secondByte & 0b0100_0000;

    const itemsBytesCount = secondByte & 0b0000_0111;
    const lengthBytesCount = (secondByte & 0b0011_1000) >>> 3;

    const TypedArrayConstructor = typedArrayConstructorByType[typeByte];
    const tarr0: TTypedArray = new TypedArrayConstructor(0);
    const bytesPerElement = getBytesPerElement(tarr0);

    const len = isKeyValueEncoding
        ? bytesToInteger(stream.readBytes(lengthBytesCount))
        : bytesToInteger(stream.readBytes(itemsBytesCount));

    const count = isKeyValueEncoding ? bytesToInteger(stream.readBytes(itemsBytesCount)) : len;

    const dataGetterName = dataViewGetter[typeByte];

    if (isKeyValueEncoding) {
        const tarr = new TypedArrayConstructor(Math.round(len / bytesPerElement));
        for (let i = 0; i < count; i += 1) {
            const key = decodeInteger(stream.readByte(), stream);
            const valueBytes = stream.readBytes(bytesPerElement);
            const view = new DataView(valueBytes.buffer);
            tarr[key] = view[dataGetterName](0, true);
        }
        if (typeByte === ETypedArrayByteCode.ArrayBuffer) {
            return tarr.buffer;
        }
        return tarr;
    } else {
        const tarr = new TypedArrayConstructor(len);
        const view = new DataView(stream.readBytes(bytesPerElement * len).buffer);
        for (let i = 0; i < len; i += 1) {
            tarr[i] = view[dataGetterName](i * bytesPerElement, true);
        }
        if (typeByte === ETypedArrayByteCode.ArrayBuffer) {
            return tarr.buffer;
        }
        return tarr;
    }
};
