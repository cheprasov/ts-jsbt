import { EConstantByteCode } from '../EConstantByteCode';
import { toCode } from '../utils/toCode';

const TRUE_BYTE_CHR = toCode(EConstantByteCode.TRUE);
const FALSE_BYTE_CHR = toCode(EConstantByteCode.FALSE);

export const encodeBoolean = (value: boolean): string => {
    if (typeof value !== 'boolean') {
        throw new Error(`Expecting "boolean" type, received "${value}" (${typeof value})`);
    }
    return value ? TRUE_BYTE_CHR : FALSE_BYTE_CHR;
}