import { TUint8 } from '../types/TUint8';

export const doubleToBytes = (value: number, bigEndianOrder = false): TUint8 => {
    const buffer = new ArrayBuffer(8); // JS numbers are 8 bytes long, or 64 bits
    const longNum = new Float64Array(buffer); // so equivalent to Float64
    longNum[0] = value;
    const bytes = Array.from(new Uint8Array(buffer));
    return (bigEndianOrder ? bytes.reverse() : bytes) as TUint8;
}
