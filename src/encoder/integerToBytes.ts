import { bigIntToBytes } from './bigIntToBytes';

export const integerToBytes = (int: number, byteSize: number = 0, bigEndianOrder: boolean = false): number[] => {
    if (int > 0xFF_FF_FF_FF) {
        // Because JS uses 4 bytes for bitwise operations :(
        return bigIntToBytes(BigInt(int), byteSize, bigEndianOrder).map((bint) => Number(bint));
    }
    const bytes: number[] = [];
    let num = int;
    for (let i = 1; byteSize ? i <= byteSize : num; i += 1) {
        bytes.push(num & 0xFF);
        num = num >>> 8;
    }

    return bigEndianOrder ? bytes.reverse() : bytes;
}