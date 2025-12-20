import { TObject } from '../../types/TObject';

export const isPlainObject = (value: any): value is TObject => {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype; // plain object `{}`
};
