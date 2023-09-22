export const bytesToBigInt = (bytes: Uint8Array | number[]): bigint => {
    const len = Array.isArray(bytes) ? bytes.length : bytes.byteLength;
    if (len === 0) {
        return 0n;
    }

    let bint = 0n;
    for (let i = 0; i < len; i += 1) {
        const byte = BigInt(bytes[i]);
        bint = (byte << BigInt(8 * i)) | bint
    }

    return bint;
};
