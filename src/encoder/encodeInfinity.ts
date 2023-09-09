import { EConstantByteCode } from '../EConstantByteCode';
import { toCode } from '../utils/toCode';

const POS_INFINITY_CHR = toCode(EConstantByteCode.Pos_Infinity);
const NEG_INFINITY_CHR = toCode(EConstantByteCode.Neg_Infinity);

export const encodeInfinity = (value: number): string => {
    if (value !== Infinity && value !== -Infinity) {
        throw new Error(`Expecting "Infinity", received "${value}" (${typeof value})`);
    }
    return value > 0 ? POS_INFINITY_CHR : NEG_INFINITY_CHR;
}