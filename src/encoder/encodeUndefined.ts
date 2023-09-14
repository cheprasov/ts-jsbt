import { EConstantByteCode } from '../enums/EConstantByteCode';
import { toChar } from '../utils/toChar';

const UNDEFINED_BYTE = toChar(EConstantByteCode.Undefined)

export const encodeUndefined = (): string => {
    return UNDEFINED_BYTE;
}