import { bytesToInteger } from '../converter/bytesToInteger';
import { EConstantByteCode } from '../enums/EConstantByteCode';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeIntegerStream } from './decodeIntegerStream';
import { decodeStream } from './decodeStream';

export const decodeArrayStream = async (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions,
    initArr: any[] = []
): Promise<any[]> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Array) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding array`);
    }

    const isKeyValueEncoding = typeByte & 0b0000_1000;

    const bytesCount = typeByte & 0b0000_0111;
    if (bytesCount === 0) {
        return initArr;
    }

    const arrayLen = bytesToInteger(await stream.readStreamBytes(bytesCount));
    const itemsCoint = isKeyValueEncoding ? bytesToInteger(await stream.readStreamBytes(bytesCount)) : arrayLen;

    const arr = initArr;
    arr.length = arrayLen;
    if (isKeyValueEncoding) {
        for (let i = 0; i < itemsCoint; i += 1) {
            const key = await decodeIntegerStream(await stream.readStreamByte(), stream);
            const value = await decodeStream(await stream.readStreamByte(), stream, options);
            arr[key] = value;
        }
    } else {
        for (let i = 0; i < arrayLen; i += 1) {
            const byte = await stream.readStreamByte();
            if (byte === EConstantByteCode.Empty_Value) {
                continue;
            }
            const value = await decodeStream(byte, stream, options);
            arr[i] = value;
        }
    }

    return arr;
};
