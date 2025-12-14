import { ETypeByteCode } from '../enums/ETypeByteCode';
import { bigIntToBytes } from '../converter/bigIntToBytes';
import { integerToBytes } from '../converter/integerToBytes';
import { isBigInt } from '../utils/vars/isBigInt';
import { IDataWriter } from '../writer/IDataWriter';

const ZERO_BYTE = ETypeByteCode.BigInt & 0b1111_0000;

export const encodeBigInt = (value: bigint, writer: IDataWriter): number => {
    if (!isBigInt(value)) {
        throw new Error(`Expecting "bigint" type, received "${value}" (${typeof value})`);
    }

    if (value === 0n) {
        return writer.pushByte(ZERO_BYTE);
    }

    const val = value < 0n ? -value : value;
    const isPositive = value > 0;

    const bytes = bigIntToBytes(val);
    const lenBytes = integerToBytes(bytes.length);
    // type byte
    writer.pushByte(
        ETypeByteCode.BigInt | (0b0000_0111 & lenBytes.length) | (isPositive ? 0 : 0b0000_1000)
    );
    // length bytes
    writer.pushBytes(lenBytes);
    // encode bytes
    return writer.pushBytes(bytes.map((i) => Number(i)));
};
