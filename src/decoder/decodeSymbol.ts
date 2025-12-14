import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';

export const decodeSymbol = (typeByte: number, stream: ByteStream): symbol => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Symbol) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding symbol`);
    }

    const count = typeByte & 0b0000_0111;
    if (count === 0) {
        return Symbol.for('');
    }

    const bytesCount = stream.readBytes(count);
    const strLen = bytesToInteger(bytesCount);

    const decoder = new TextDecoder('utf-8');
    const bytes = stream.readBytes(strLen);
    return Symbol.for(decoder.decode(bytes));
};
