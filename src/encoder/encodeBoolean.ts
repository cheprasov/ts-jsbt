import { EConstantByteCode } from '../enums/EConstantByteCode';
import { toChar } from '../utils/toChar';

const TRUE_BYTE_CHR = toChar(EConstantByteCode.TRUE);
const FALSE_BYTE_CHR = toChar(EConstantByteCode.FALSE);

export const encodeBoolean = (value: boolean): string => {
    if (typeof value !== 'boolean') {
        throw new Error(`Expecting "boolean" type, received "${value}" (${typeof value})`);
    }
    return value ? TRUE_BYTE_CHR : FALSE_BYTE_CHR;
}