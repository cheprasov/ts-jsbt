import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decode } from './decode';

export const decodeObject = (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions
): Record<string | symbol | number, any> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Object) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding object`);
    }

    const bytesCount = typeByte & 0b0000_0111;
    if (bytesCount === 0) {
        return {};
    }

    const count = bytesToInteger(stream.readBytes(bytesCount));

    const obj: Record<string | symbol | number, any> = {};

    for (let i = 0; i < count; i += 1) {
        const key = decode(stream.readByte(), stream, options);
        const value = decode(stream.readByte(), stream, options);
        obj[key] = value;
    }

    return obj;
};
