import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';

export const decodeIntegerStream = async (typeByte: number, stream: ByteStream): Promise<number> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Integer) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding integer`);
    }

    const count = typeByte & 0b0000_0111;
    const isNegative = Boolean(typeByte & 0b0000_1000);
    if (count === 0) {
        return isNegative ? -0 : 0;
    }
    const bytesCount = await stream.readStreamBytes(count)
    const int = bytesToInteger(bytesCount);

    return isNegative ? -int : int;
};
