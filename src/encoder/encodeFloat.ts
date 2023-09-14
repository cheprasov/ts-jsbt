import { doubleToBytes } from '../converter/doubleToBytes';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import { toChar } from '../utils/toChar';
import { isFloat } from '../utils/vars/isFloat';

export const encodeFloat = (value: number, mapping: boolean = true): string => {
    if (!isFloat(value)) {
        throw new Error(`Expecting "float" type, received "${value}" (${typeof value})`);
    }
    const bytes = doubleToBytes(value);
    const msg: string[] = [];

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
    while (!bytes[0] && bytes.length) {
        bytes.shift();
    }

    // no reason to use mapping if only 2 bytes could be missed
    const isMapping = mapping && byteMap && mappedBytes.length < (bytes.length - 1);

    // type byte
    msg.push(
        toChar(
            ETypeByteCode.Float |
                (0b0000_0111 & ((isMapping ? mappedBytes.length : bytes.length) - 1)) |
                (isMapping ? 0b0000_1000 : 0)
        )
    );
    if (isMapping) {
        //mapping byte
        msg.push(toChar(byteMap));
    }
    // encode bytes
    msg.push(toChar(...(isMapping ? mappedBytes : bytes)));

    return msg.join('');
};
