import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decode } from './decode';

export const decodeMap = (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions,
    initMap: Map<any, any> = new Map()
): Map<any, any> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Map) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding map`);
    }

    const bytesCount = typeByte & 0b0000_0111;
    if (bytesCount === 0) {
        return initMap;
    }

    const count = bytesToInteger(stream.readBytes(bytesCount));

    const map = initMap;

    for (let i = 0; i < count; i += 1) {
        const key = decode(stream.readByte(), stream, options);
        const value = decode(stream.readByte(), stream, options);
        map.set(key, value);
    }

    return map;
};
