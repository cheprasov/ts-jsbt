export const bigIntToBytes = (bint: bigint, byteSize: number = 0, bigEndianOrder: boolean = false): bigint[] => {
    if (bint < 0 && !byteSize) {
        throw new Error(`byteSize param should be provided for negative bigInt ${bint}`);
    }
    const bytes: bigint[] = [];
    let num = bint < 0 ? -(bint + 1n) : bint;
    for (let i = 1; byteSize ? i <= byteSize : num; i += 1) {
        bytes.push(num & 0xFFn);
        num = num >> 8n;
    }

    if (bint < 0) {
        for (let i = 0; i < bytes.length; i += 1) {
            bytes[i] = 255n - bytes[i];
        }
        //bytes.push(255n);
    }

    return bigEndianOrder ? bytes.reverse() : bytes;
}