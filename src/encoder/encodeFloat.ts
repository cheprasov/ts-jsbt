// import { doubleToBytes } from '../converter/doubleToBytes';
// import { ETypeByteCode } from '../enums/ETypeByteCode';
// import { isFloat } from '../utils/vars/isFloat';
// import { IDataWriter } from '../writer/IDataWriter';

// export const encodeFloat = (value: number, writer: IDataWriter, mapping: boolean = true): number => {
//     if (!isFloat(value)) {
//         throw new Error(`Expecting "float" type, received "${value}" (${typeof value})`);
//     }
//     let bytes = doubleToBytes(value);

//     const mappedBytes: number[] = [];
//     let byteMap = 0x0;

//     if (mapping) {
//         for (let i = 0; i < 8; i += 1) {
//             const byte = bytes[i];
//             if (byte) {
//                 byteMap = byteMap + 2 ** (7 - i);
//                 mappedBytes.push(byte);
//             }
//         }
//     }

//     // trim bytes
//     while (bytes.length && bytes[0] === 0) {
//         bytes = bytes.subarray(1);
//     }

//     // no reason to use mapping if only 2 bytes could be missed
//     const isMapping = mapping && byteMap && mappedBytes.length < (bytes.length - 1);

//     // type byte
//     writer.pushByte(
//         ETypeByteCode.Float |
//             (0b0000_0111 & ((isMapping ? mappedBytes.length : bytes.length) - 1)) |
//             (isMapping ? 0b0000_1000 : 0)
//     );
//     if (isMapping) {
//         //mapping byte
//         writer.pushByte(byteMap);
//     }
//     // encode bytes
//     return writer.pushBytes(isMapping ? mappedBytes : bytes);
// };

import { doubleToBytes } from '../converter/doubleToBytes';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import { isFloat } from '../utils/vars/isFloat';
import { IDataWriter } from '../writer/IDataWriter';

export const encodeFloat = (value: number, writer: IDataWriter, mapping: boolean = true): number => {
    if (!isFloat(value)) {
        throw new Error(`Expecting "float" type, received "${value}" (${typeof value})`);
    }

    const bytes = doubleToBytes(value); // ideally Uint8Array length 8

    // Find leading zero trim start (no subarray)
    let start = 0;
    while (start < 8 && bytes[start] === 0) start++;

    const trimmedLen = 8 - start;
    // If everything is zero, this should not happen because 0.0 must be encoded as Integer(0)
    // but just in case:
    if (trimmedLen <= 0) {
        // Fallback: encode as Integer(0) elsewhere; here throw:
        throw new Error('Float(0) must be encoded as Integer(0)');
    }

    // Build mapping bitmask and count non-zero bytes across full 8 bytes
    let byteMap = 0;
    let mappedCount = 0;
    if (mapping) {
        // bit 7 corresponds to bytes[0], bit 0 corresponds to bytes[7]
        for (let i = 0; i < 8; i++) {
            const b = bytes[i];
            if (b !== 0) {
                byteMap |= (1 << (7 - i));
                mappedCount++;
            }
        }
    }

    // "no reason to use mapping if only 2 bytes could be missed" (your original rule)
    // Your original condition:
    // isMapping = mapping && byteMap && mappedBytes.length < (bytes.length - 1)
    // Here bytes.length is 8, but you compare to trimmedLen.
    const isMapping = !!(mapping && byteMap && mappedCount < (trimmedLen - 1));

    const payloadLen = isMapping ? mappedCount : trimmedLen;

    // type byte
    writer.pushByte(
        ETypeByteCode.Float
        | (0b0000_0111 & (payloadLen - 1))
        | (isMapping ? 0b0000_1000 : 0)
    );

    if (isMapping) {
        writer.pushByte(byteMap);
        // write only non-zero bytes in original order (i=0..7)
        for (let i = 0; i < 8; i++) {
            const b = bytes[i];
            if (b !== 0) writer.pushByte(b);
        }
        return writer.getOffset();
    }

    // non-mapping: write trimmed bytes (start..7)
    for (let i = start; i < 8; i++) {
        writer.pushByte(bytes[i]);
    }
    return writer.getOffset();
};
