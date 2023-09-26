import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import { ETypedArrayByteCode } from '../enums/ETypedArrayByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { TTypedArray } from '../types/TTypedArray';
import { getBytesPerElement } from '../utils/typedArrays/getTypedArrayByteCount';
import { decodeIntegerStream } from './decodeIntegerStream';
import { dataViewGetter, typedArrayConstructorByType } from './decodeTypedArray';

export const decodeTypedArrayStream = async (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions
): Promise<TTypedArray | ArrayBuffer> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Typed_Array) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding typed array`);
    }
    const secondByte = await stream.readStreamByte();
    const isKeyValueEncoding = secondByte & 0b0100_0000;

    const itemsBytesCount = secondByte & 0b0000_0111;
    const lengthBytesCount = (secondByte & 0b0011_1000) >>> 3;

    const TypedArrayConstructor = typedArrayConstructorByType[typeByte];
    const tarr0: TTypedArray = new TypedArrayConstructor(0);
    const bytesPerElement = getBytesPerElement(tarr0);

    const len = isKeyValueEncoding
        ? bytesToInteger(await stream.readStreamBytes(lengthBytesCount))
        : bytesToInteger(await stream.readStreamBytes(itemsBytesCount));

    const count = isKeyValueEncoding ? bytesToInteger(await stream.readStreamBytes(itemsBytesCount)) : len;

    const dataGetterName = dataViewGetter[typeByte];

    if (isKeyValueEncoding) {
        const tarr = new TypedArrayConstructor(Math.round(len / bytesPerElement));
        for (let i = 0; i < count; i += 1) {
            const key = await decodeIntegerStream(await stream.readStreamByte(), stream);
            const valueBytes = await stream.readStreamBytes(bytesPerElement);
            const view = new DataView(valueBytes.buffer);
            tarr[key] = view[dataGetterName](0, true);
        }
        if (typeByte === ETypedArrayByteCode.ArrayBuffer) {
            return tarr.buffer;
        }
        return tarr;
    } else {
        const tarr = new TypedArrayConstructor(len);
        const view = new DataView((await stream.readStreamBytes(bytesPerElement * len)).buffer);
        for (let i = 0; i < len; i += 1) {
            tarr[i] = view[dataGetterName](i * bytesPerElement, true);
        }
        if (typeByte === ETypedArrayByteCode.ArrayBuffer) {
            return tarr.buffer;
        }
        return tarr;
    }
};
