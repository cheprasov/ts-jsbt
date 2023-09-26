import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeStream } from './decodeStream';

export const decodeObjectStream = async (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions,
    initObj: Record<string | symbol | number, any> = {}
): Promise<Record<string | symbol | number, any>> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Object) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding object`);
    }

    const bytesCount = typeByte & 0b0000_0111;
    if (bytesCount === 0) {
        return initObj;
    }

    const count = bytesToInteger(await stream.readStreamBytes(bytesCount));

    const obj: Record<string | symbol | number, any> = initObj;

    for (let i = 0; i < count; i += 1) {
        const key = await decodeStream(await stream.readStreamByte(), stream, options);
        const value = await decodeStream(await stream.readStreamByte(), stream, options);
        obj[key] = value;
    }

    return obj;
};
