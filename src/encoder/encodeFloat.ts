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

    // Find leading zeros WITHOUT shift()
    let startTrim = 0;
    while (startTrim < 8 && bytes[startTrim] === 0) startTrim++;

    const trimmedLen = 8 - startTrim;
    if (trimmedLen <= 0) {
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

    // mapping if saves more than ~1 byte vs trimmed payload
    const isMapping = !!(mapping && byteMap && mappedCount < (trimmedLen - 1));
    const payloadLen = isMapping ? mappedCount : trimmedLen;

    // Pre-allocate roughly: 1 type + maybe 1 map + payload (as one toChar call)
    const msg: string[] = [];

    // type byte
    msg.push(toChar(
        ETypeByteCode.Float
            | (0b0000_0111 & (payloadLen - 1))
            | (isMapping ? 0b0000_1000 : 0)
    ));

    if (isMapping) {
        // mapping byte
        msg.push(toChar(byteMap));

        // payload: only non-zero bytes, in original order
        // We still need a number[] for toChar(...codes), but it's at most 8 items
        const out: number[] = new Array(mappedCount);
        let j = 0;
        for (let i = 0; i < 8; i += 1) {
            const b = bytes[i];
            if (b !== 0) {
                out[j] = b;
                j += 1;
            }
        }
        msg.push(toChar(...out));
    } else {
        // payload: trimmed bytes
        // Again, max 8 bytes: cheap
        const out: number[] = new Array(trimmedLen);
        for (let i = 0; i < trimmedLen; i += 1) {
            out[i] = bytes[startTrim + i];
        }
        msg.push(toChar(...out));
    }

    return msg.join('');
};