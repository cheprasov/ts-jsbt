import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_DATE_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { IDataWriter } from '../writer/IDataWriter';

const ZERO_DATE_BYTE = ETypeByteCode.Date & 0b1111_0000;

export const encodeDate = (value: Date, writer: IDataWriter): number => {
    if (!(value instanceof Date)) {
        throw new Error(`Expecting "Date" type, received "${value}" (${typeof value})`);
    }
    const ms = value.getTime();
    if (Math.abs(ms) > MAX_DATE_INTEGER) {
        throw new Error(`Can not encode invalid date`);
    }
    if (ms === 0) {
        return writer.pushByte(ZERO_DATE_BYTE);
    }
    const val = Math.abs(ms);
    const isPositive = ms > 0;

    const bytes = integerToBytes(val);
    // type byte
    writer.pushByte(
        ETypeByteCode.Date |
        ((0b0000_0111 & bytes.length) | (isPositive ? 0 : 0b0000_1000))
    );
    // encode bytes
    return writer.pushBytes(bytes);
};
