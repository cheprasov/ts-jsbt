import { bytesToInteger } from '../converter/bytesToInteger';
import { bytesToUtf16 } from '../converter/bytesToUtf16';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';

export const decodeString = (typeByte: number, stream: ByteStream): string => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.String) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding string`);
    }

    const count = typeByte & 0b0000_0111;
    if (count === 0) {
        return '';
    }

    const bytesCount = stream.readBytes(count)
    const strLen = bytesToInteger(bytesCount);

    const bytes = stream.readBytes(strLen);
    return bytesToUtf16(bytes);
};
