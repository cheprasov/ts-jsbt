import { EConstantByteCode } from '../EConstantByteCode';
import { toCode } from '../utils/toCode';

const EMPTY_VALUE_BYTE_CHR = toCode(EConstantByteCode.Empty_Value)

export const encodeEmptyValue = (): string => {
    return EMPTY_VALUE_BYTE_CHR;
}