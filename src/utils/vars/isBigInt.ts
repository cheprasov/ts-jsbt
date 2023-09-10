
export const isBigInt = (value: any): value is bigint => {
    return typeof value === 'bigint';
}
