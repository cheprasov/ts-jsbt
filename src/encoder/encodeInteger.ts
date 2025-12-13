import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { isInteger } from '../utils/vars/isInteger';
import { IDataWriter } from '../writer/IDataWriter';

const POS_ZERO_BYTE = ETypeByteCode.Integer & 0b1111_0000;
const NEG_ZERO_BYTE = (ETypeByteCode.Integer & 0b1111_0000) | 0b0000_1000;

export const encodeInteger = (value: number, writer: IDataWriter): number => {
    if (!isInteger(value)) {
        throw new Error(`Expecting "integer" type, received "${value}" (${typeof value})`);
    }
    if (Math.abs(value) > MAX_7_BYTES_INTEGER) {
        throw new Error(`Can not encode unsafe integer`);
    }
    if (value === 0) {
        return writer.pushByte(Object.is(value, 0) ? POS_ZERO_BYTE : NEG_ZERO_BYTE);
    }
    const val = Math.abs(value);
    const isPositive = value > 0;

    const bytes = integerToBytes(val);
    // type byte
    writer.pushByte(ETypeByteCode.Integer | ((0b0000_0111 & bytes.length) | (isPositive ? 0 : 0b0000_1000)));
    // encode bytes
    return writer.pushBytes(bytes);

};
