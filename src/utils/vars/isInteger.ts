export const isInteger = (value: any): value is number => {
    return (
        typeof value === 'number' &&
        Number.isInteger(value) &&
        value <= Number.MAX_SAFE_INTEGER &&
        value >= Number.MIN_SAFE_INTEGER
    );
};
