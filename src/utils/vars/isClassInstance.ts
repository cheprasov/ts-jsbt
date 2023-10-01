
export const isClassInstance = (value: any): boolean => {
    return (
        typeof value === 'object' &&
        value &&
        !Array.isArray(value) &&
        value?.constructor?.name &&
        value.constructor.name !== 'Object'
    );
};
