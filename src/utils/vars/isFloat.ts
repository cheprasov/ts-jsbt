export const isFloat = (value: any): value is number => {
    return typeof value === 'number'
        && !Number.isInteger(value)
        && Number.isFinite(value);
};
