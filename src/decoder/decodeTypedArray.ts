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

export const typedArrayConstructorByType: Record<number, TTypedArrayConstructor> = {};
if (typeof(Uint8Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.ArrayBuffer] = Uint8Array;
    typedArrayConstructorByType[ETypedArrayByteCode.Uint8Array] = Uint8Array;
}
if (typeof(Int8Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.Int8Array] = Int8Array;
}
if (typeof(Uint8ClampedArray) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.Uint8ClampedArray] = Uint8ClampedArray;
}
if (typeof(Int16Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.Int16Array] = Int16Array;
}
if (typeof(Uint16Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.Uint16Array] = Uint16Array;
}
if (typeof(Int32Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.Int32Array] = Int32Array;
}
if (typeof(Uint32Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.Uint32Array] = Uint32Array;
}
if (typeof(Float32Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.Float32Array] = Float32Array;
}
if (typeof(Float64Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.Float64Array] = Float64Array;
}
if (typeof(BigInt64Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.BigInt64Array] = BigInt64Array;
}
if (typeof(BigUint64Array) !== 'undefined') {
    typedArrayConstructorByType[ETypedArrayByteCode.BigUint64Array] = BigUint64Array;
}

export const dataViewGetter: Record<number, TDataViewGetter> = {
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
        throw new Error(`Provaded incorrect type ${typeByte} for decoding typed array`);
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
