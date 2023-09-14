import { EConstantByteCode } from '../enums/EConstantByteCode';
import { toChar } from '../utils/toChar';

const NAN_BYTE = toChar(EConstantByteCode.NaN)

export const encodeNaN = (): string => {
    return NAN_BYTE;
}