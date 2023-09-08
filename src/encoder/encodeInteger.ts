import { ETypeByteCode } from '../ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { toCode } from '../utils/toCode';
import { isInteger } from '../utils/vars/isInteger';
import { integerToBytes } from './integerToBytes';

const POS_ZERO_BYTE_CHAR = toCode(ETypeByteCode.Integer & 0b1111_0000);
const NEG_ZERO_BYTE_CHAR = toCode(ETypeByteCode.Integer & 0b1111_0000 | 0b0000_1000);

export const encodeInteger = (value: number): string => {
    if (!isInteger(value)) {
        throw new Error(`Expecting "integer" type, received "${value}" (${typeof value})`);
    }
    if (Math.abs(value) > MAX_7_BYTES_INTEGER) {
        throw new Error(`Can not encode unsafe integer`);
    }
    if (value === 0) {
        return Object.is(value, 0) ? POS_ZERO_BYTE_CHAR : NEG_ZERO_BYTE_CHAR;
    }
    const msg: string[] = [];
    const val = Math.abs(value);
    const isPositive = value > 0;

    const bytes = integerToBytes(val);
    // type byte
    msg.push(toCode(ETypeByteCode.Integer | ((0b0000_0111 & bytes.length) | (isPositive ? 0 : 0b0000_1000))));
    // encode bytes
    msg.push(toCode(...bytes));

    return msg.join('');
};
