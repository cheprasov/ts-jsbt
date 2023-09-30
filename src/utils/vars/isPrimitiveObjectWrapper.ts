import { TPrimitiveObjectWrapper } from '../../types/TPrimitiveObjectWrapper';

export const isPrimitiveObjectWrapper = (value: any): value is TPrimitiveObjectWrapper => {
    return value instanceof Number || value instanceof String || value instanceof Boolean;
};
