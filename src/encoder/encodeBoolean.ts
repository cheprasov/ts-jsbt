import { EConstantByteCode } from '../EConstantByte';

export const encodeBoolean = (value: boolean): string | null => {
    if (typeof value !== 'boolean') {
        return null;
    }
    return String.fromCharCode(value ? EConstantByteCode.TRUE : EConstantByteCode.FALSE);
}