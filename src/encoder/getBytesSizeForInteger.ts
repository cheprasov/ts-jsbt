export const getBytesSizeForInteger = (n: number): number => {
    const int = Math.abs(n);
    if (int === 0) {
        return 0;
    }
    let maxNBytesNumber = 0;
    for (let i = 1; i <= 8; i += 1) {
        maxNBytesNumber = (maxNBytesNumber << 8) | 0xFF;
        if (int <= maxNBytesNumber) {
            return i;
        }
    }
    return Math.ceil((int).toString(16).length / 2);
}