import { EConstantByteCode } from '../EConstantByteCode';
import { toCode } from '../utils/toCode';

const UNDEFINED_BYTE = toCode(EConstantByteCode.Undefined)

export const encodeUndefined = (): string => {
    return UNDEFINED_BYTE;
}