export const integerToBytes = (int: number, byteSize: number = 0, bigEndianOrder: boolean = false): number[] => {
    if (int < 0) {
        throw new Error('integerToBytes does not support negative integers');
    }
    const bytes: number[] = [];
    let num = Math.abs(int);
    for (let i = 1; byteSize ? i <= byteSize : num; i += 1) {
        const n = num % 256;
        bytes.push(n);
        num = num - n;
        num = Math.floor(num / 256);
    }
    return bigEndianOrder ? bytes.reverse() : bytes;
}