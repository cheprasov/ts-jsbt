import { EConstantByteCode } from '../enums/EConstantByteCode';
import { toChar } from '../utils/toChar';

const EMPTY_VALUE_BYTE_CHR = toChar(EConstantByteCode.Empty_Value)

export const encodeEmptyValue = (): string => {
    return EMPTY_VALUE_BYTE_CHR;
}