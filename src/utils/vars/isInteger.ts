
export const isInteger = (value: any): value is number => {
    return typeof value === 'number' && Number.isInteger(value);
}