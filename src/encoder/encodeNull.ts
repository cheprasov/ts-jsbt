import { EConstantByteCode } from '../EConstantByteCode';
import { toCode } from '../utils/toCode';

const NULL_BYTE = toCode(EConstantByteCode.Null)

export const encodeNull = (): string => {
    return NULL_BYTE;
}