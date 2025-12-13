import { doubleToBytes } from '../converter/doubleToBytes';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import { isFloat } from '../utils/vars/isFloat';
import { IDataWriter } from '../writer/IDataWriter';

export const encodeFloat = (value: number, writer: IDataWriter, mapping: boolean = true): number => {
    if (!isFloat(value)) {
        throw new Error(`Expecting "float" type, received "${value}" (${typeof value})`);
    }
    let bytes = doubleToBytes(value);

    const mappedBytes: number[] = [];
    let byteMap = 0x0;

    if (mapping) {
        for (let i = 0; i < 8; i += 1) {
            const byte = bytes[i];
            if (byte) {
                byteMap = byteMap + 2 ** (7 - i);
                mappedBytes.push(byte);
            }
        }
    }

    // trim bytes
    while (bytes.length && bytes[0] === 0) {
        bytes = bytes.subarray(1);
    }

    // no reason to use mapping if only 2 bytes could be missed
    const isMapping = mapping && byteMap && mappedBytes.length < (bytes.length - 1);

    // type byte
    writer.pushByte(
        ETypeByteCode.Float |
            (0b0000_0111 & ((isMapping ? mappedBytes.length : bytes.length) - 1)) |
            (isMapping ? 0b0000_1000 : 0)
    );
    if (isMapping) {
        //mapping byte
        writer.pushByte(byteMap);
    }
    // encode bytes
    return writer.pushBytes(isMapping ? mappedBytes : bytes);
};
