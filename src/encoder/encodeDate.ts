import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_DATE_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { toChar } from '../utils/toChar';
import { IEncodeOptions } from '../types/IEncodeOptions';

const ZERO_BYTE_CHAR = toChar(ETypeByteCode.Date & 0b1111_0000);

export const encodeDate = (value: Date, options?: IEncodeOptions): string => {
    if (!(value instanceof Date)) {
        throw new Error(`Expecting "Date" type, received "${value}" (${typeof value})`);
    }
    const ms = value.getTime();
    if (Math.abs(ms) > MAX_DATE_INTEGER) {
        throw new Error(`Can not encode invalid date`);
    }
    if (ms === 0) {
        return ZERO_BYTE_CHAR;
    }
    const msg: string[] = [];
    const val = Math.abs(ms);
    const isPositive = ms > 0;

    const bytes = integerToBytes(val);
    // type byte
    msg.push(toChar(ETypeByteCode.Date | ((0b0000_0111 & bytes.length) | (isPositive ? 0 : 0b0000_1000))));
    // encode bytes
    msg.push(toChar(...bytes));

    return msg.join('');
};
