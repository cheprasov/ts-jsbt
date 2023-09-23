import { bytesToInteger } from '../converter/bytesToInteger';
import { EConstantByteCode } from '../enums/EConstantByteCode';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decode } from './decode';
import { decodeInteger } from './decodeInteger';

export const decodeArray = (typeByte: number, stream: ByteStream, options: IDecodeOptions): any[] => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Array) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding array`);
    }

    const isKeyValueEncoding = typeByte & 0b0000_1000;

    const bytesCount = typeByte & 0b0000_0111;
    if (bytesCount === 0) {
        return [];
    }

    const arrayLen = bytesToInteger(stream.readBytes(bytesCount));
    const itemsCoint = isKeyValueEncoding ? bytesToInteger(stream.readBytes(bytesCount)) : arrayLen;

    const arr = [];
    arr.length = arrayLen;
    if (isKeyValueEncoding) {
        for (let i = 0; i < itemsCoint; i += 1) {
            const key = decodeInteger(stream.readByte(), stream);
            const value = decode(stream.readByte(), stream, options);
            arr[key] = value;
        }
    } else {
        for (let i = 0; i < arrayLen; i += 1) {
            const byte = stream.readByte();
            if (byte === EConstantByteCode.Empty_Value) {
                continue;
            }
            const value = decode(byte, stream, options);
            arr[i] = value;
        }
    }

    return arr;
};
