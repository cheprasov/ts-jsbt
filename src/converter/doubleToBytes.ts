
export const doubleToBytes = (value: number, bigEndianOrder = false): Uint8Array => {
    const buffer = new ArrayBuffer(8); // JS numbers are 8 bytes long, or 64 bits
    const longNum = new Float64Array(buffer); // so equivalent to Float64
    longNum[0] = value;
    const arr = new Uint8Array(buffer);
    return bigEndianOrder ? arr.reverse() : arr;
}
