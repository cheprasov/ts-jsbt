import { TObject } from '../../types/TObject';

export const isNullProtoObject = (value: any): value is TObject => {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        Object.getPrototypeOf(value) === null
    );
};
