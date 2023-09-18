import { TObject } from '../../types/TObject';

export const isObject = (value: any): value is TObject => {
    return typeof value === 'object' && value && !Array.isArray(value) && value?.constructor?.name === 'Object';
}
