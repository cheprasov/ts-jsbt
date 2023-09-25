import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';

export const decodeDate = (typeByte: number, stream: ByteStream): Date => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Date) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding Date`);
    }

    const count = typeByte & 0b0000_0111;
    const isNegative = Boolean(typeByte & 0b0000_1000);
    if (count === 0) {
        return new Date(0);
    }
    const bytesCount = stream.readBytes(count)
    const int = bytesToInteger(bytesCount);

    return new Date(isNegative ? -int : int);
};
