export const bigIntToBytes = (bint: bigint, byteSize: number = 0, bigEndianOrder: boolean = false): bigint[] => {
    const bytes: bigint[] = [];
    let num = bint;
    for (let i = 1; byteSize ? i <= byteSize : num; i += 1) {
        bytes.push(num & 0xFFn);
        num = num >> 8n;
    }

    return bigEndianOrder ? bytes.reverse() : bytes;
}