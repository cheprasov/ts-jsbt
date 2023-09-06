export const getBytesFromInteger = (n: number, byteSize: number = 0, bigEndianOrder: boolean = true): number[] => {
    const bytes: number[] = [];
    let num = n;
    for (let i = 1; byteSize ? i <= byteSize : num; i += 1) {
        bytes.push(num & 0xFF);
        num = num >>> 8;
    }

    return bigEndianOrder ? bytes.reverse() : bytes;
}