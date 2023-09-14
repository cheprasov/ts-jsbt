import { EConstantByteCode } from '../enums/EConstantByteCode';
import { toChar } from '../utils/toChar';

const NULL_BYTE = toChar(EConstantByteCode.Null)

export const encodeNull = (): string => {
    return NULL_BYTE;
}