import { EConstantByteCode } from '../EConstantByteCode';
import { toCode } from '../utils/toCode';

const NAN_BYTE = toCode(EConstantByteCode.NaN)

export const encodeNaN = (): string => {
    return NAN_BYTE;
}