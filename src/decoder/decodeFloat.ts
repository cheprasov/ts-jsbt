import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';

export const decodeFloat = (typeByte: number, stream: ByteStream): number => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Float) {
        throw new Error(`Provaded incorrect type ${typeByte} for decode float`);
    }
    debugger;
    const count = (typeByte & 0b0000_0111) + 1;
    let map = 0b0000_0000;

    if (typeByte & 0b0000_1000) {
        // custom map
        map = stream.readByte();
    } else {
        for (let i = 0; i < count; i += 1) {
            map = map | (0b000_0001 << i);
        }
    }

    const bytesCount = stream.readBytes(count)
    const floatBytes = new Uint8Array(8);

    let byteIndex = 0;
    for (let i = 0; i < 8; i += 1) {
        if (map & (0b1000_0000 >> i)) {
            floatBytes[i] = bytesCount[byteIndex];
            byteIndex += 1;
        }
    }

    const float = new Float64Array(floatBytes.buffer);
    return float[0];
};
