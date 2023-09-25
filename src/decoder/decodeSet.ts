import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decode } from './decode';

export const decodeSet = (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions,
    initSet: Set<any> = new Set(),
): Set<any> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Set) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding set`);
    }

    const bytesCount = typeByte & 0b0000_0111;
    if (bytesCount === 0) {
        return initSet;
    }

    const count = bytesToInteger(stream.readBytes(bytesCount));

    const set = initSet;

    for (let i = 0; i < count; i += 1) {
        const value = decode(stream.readByte(), stream, options);
        set.add(value);
    }

    return set;
};
