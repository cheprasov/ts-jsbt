export const isFloat = (value: any): value is number => {
    return (
        typeof value === 'number' &&
        Number.isFinite(value) &&
        (
            !Number.isInteger(value) ||
            value > Number.MAX_SAFE_INTEGER ||
            value < Number.MIN_SAFE_INTEGER
        )
    );
};
