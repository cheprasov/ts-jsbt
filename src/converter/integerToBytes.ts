// prettier-ignore
const UINT32_MAX = 0xFFFFFFFF;

export const integerToBytes = (num: number, byteSize: number = 0): number[] => {
    if (num < 0) {
        throw new Error('integerToBytes does not support negative integers');
    }
    const bytes: number[] = [];

    // Bits operations only for int32
    if (num <= UINT32_MAX) {
        while (num > 0) {
            bytes.push(num & 0xff);
            num >>>= 8;
        }
    } else {
        while (num > 0) {
            const n = num % 256;
            bytes.push(n);
            num = Math.floor((num - n) / 256);
        }
    }

    if (byteSize !== 0) {
        let count = byteSize - bytes.length;
        while (count > 0) {
            bytes.push(0);
            count -= 1;
        }
    }

    return bytes;
};
