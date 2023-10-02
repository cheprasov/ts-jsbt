import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';

export const decodeStringStream = async (typeByte: number, stream: ByteStream): Promise<string> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.String) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding string`);
    }

    const count = typeByte & 0b0000_0111;
    if (count === 0) {
        return '';
    }

    const bytesCount = await stream.readStreamBytes(count)
    const bytesLength = bytesToInteger(bytesCount);

    const decoder = new TextDecoder('utf-8');
    const bytes = await stream.readStreamBytes(bytesLength);
    return decoder.decode(bytes);
};
