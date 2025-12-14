// import { doubleToBytes } from '../converter/doubleToBytes';
// import { ETypeByteCode } from '../enums/ETypeByteCode';
// import { toChar } from '../utils/toChar';
// import { isFloat } from '../utils/vars/isFloat';

// export const encodeFloat = (value: number, mapping: boolean = true): string => {
//     if (!isFloat(value)) {
//         throw new Error(`Expecting "float" type, received "${value}" (${typeof value})`);
//     }
//     const bytes = doubleToBytes(value);
//     const msg: string[] = [];

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
//     while (!bytes[0] && bytes.length) {
//         bytes.shift();
//     }

//     // no reason to use mapping if only 2 bytes could be missed
//     const isMapping = mapping && byteMap && mappedBytes.length < (bytes.length - 1);

//     // type byte
//     msg.push(
//         toChar(
//             ETypeByteCode.Float |
//                 (0b0000_0111 & ((isMapping ? mappedBytes.length : bytes.length) - 1)) |
//                 (isMapping ? 0b0000_1000 : 0)
//         )
//     );
//     if (isMapping) {
//         //mapping byte
//         msg.push(toChar(byteMap));
//     }
//     // encode bytes
//     msg.push(toChar(...(isMapping ? mappedBytes : bytes)));

//     return msg.join('');
// };

import { doubleToBytes } from '../converter/doubleToBytes';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import { toChar } from '../utils/toChar';
import { isFloat } from '../utils/vars/isFloat';

export const encodeFloat = (value: number, mapping: boolean = true): string => {
    if (!isFloat(value)) {
        throw new Error(`Expecting "float" type, received "${value}" (${typeof value})`);
    }

    // IMPORTANT: assume doubleToBytes returns an array-like of length 8 (number[])
    const bytes = doubleToBytes(value);

    // Find trim start (leading zeros) WITHOUT shift()
    let start = 0;
    while (start < 8 && bytes[start] === 0) start++;

    const trimmedLen = 8 - start;
    // In JSBT spec Float(0) should be encoded as Integer(0); guard anyway
    if (trimmedLen <= 0) {
        // If you prefer, return encodeInteger(0) here, but keep behavior consistent with your lib
        throw new Error('Float(0) must be encoded as Integer(0)');
    }

    // Build byteMap + count of non-zero bytes (mapping candidate)
    let byteMap = 0;
    let mappedCount = 0;

    if (mapping) {
        for (let i = 0; i < 8; i++) {
            const b = bytes[i];
            if (b !== 0) {
                byteMap |= (1 << (7 - i)); // faster than 2**(7-i)
                mappedCount++;
            }
        }
    }

    // same rule as original: mapping if saves more than ~1 byte vs trimmed payload
    const isMapping = !!(mapping && byteMap && mappedCount < (trimmedLen - 1));
    const payloadLen = isMapping ? mappedCount : trimmedLen;

    // Build output via string array (keep your current architecture)
    // Pre-allocate roughly: 1 type + maybe 1 map + payload (as one toChar call)
    const msg: string[] = new Array(isMapping ? 3 : 2);

    // type byte
    msg[0] = toChar(
        ETypeByteCode.Float
            | (0b0000_0111 & (payloadLen - 1))
            | (isMapping ? 0b0000_1000 : 0)
    );

    let idx = 1;

    if (isMapping) {
        // mapping byte
        msg[idx] = toChar(byteMap);
        idx += 1;

        // payload: only non-zero bytes, in original order
        // We still need a number[] for toChar(...codes), but it's at most 8 items
        const out: number[] = new Array(mappedCount);
        let j = 0;
        for (let i = 0; i < 8; i++) {
            const b = bytes[i];
            if (b !== 0) out[j++] = b;
        }
        msg[idx] = toChar(...out);
    } else {
        // payload: trimmed bytes (start..7)
        // Again, max 8 bytes: cheap
        const out: number[] = new Array(trimmedLen);
        for (let i = 0; i < trimmedLen; i++) {
            out[i] = bytes[start + i];
        }
        msg[idx] = toChar(...out);
    }

    return msg.join('');
};