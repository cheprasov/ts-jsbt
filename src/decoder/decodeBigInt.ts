import { bytesToBigInt } from '../converter/bytesToBigInt';
import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';

export const decodeBigInt = (typeByte: number, stream: ByteStream): bigint => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.BigInt) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding bigint`);
    }

    const count = typeByte & 0b0000_0111;
    const isNegative = Boolean(typeByte & 0b0000_1000);
    if (count === 0) {
        return isNegative ? -0n : 0n;
    }
    const bytesCount = stream.readBytes(count);
    const encodeCount = bytesToInteger(bytesCount);
    const encodeBytes = stream.readBytes(encodeCount);
    const bint = bytesToBigInt(encodeBytes);

    return isNegative ? -bint : bint;
};
