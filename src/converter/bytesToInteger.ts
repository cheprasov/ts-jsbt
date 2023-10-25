export const bytesToInteger = (bytes: Uint8Array | number[]): number => {
    const len = Array.isArray(bytes) ? bytes.length : bytes.byteLength;
    if (len === 0) {
        return 0;
    }

    let int = 0;
    for (let i = 0; i < len; i += 1) {
        const byte = bytes[i];
        int = (byte * (256**i)) + int
    }

    return int;
}
