import { ETypeByteCode } from '../ETypeByteCode';
import { bigIntToBytes } from '../converter/bigIntToBytes';
import { integerToBytes } from '../converter/integerToBytes';
import { toCode } from '../utils/toCode';
import { isBigInt } from '../utils/vars/isBigInt';

const ZERO_BYTE_CHAR = toCode(ETypeByteCode.BigInt & 0b1111_0000);

export const encodeBigInt = (value: bigint): string => {
    if (!isBigInt(value)) {
        throw new Error(`Expecting "bigint" type, received "${value}" (${typeof value})`);
    }

    if (value === 0n) {
        return ZERO_BYTE_CHAR;
    }

    const val = value < 0n ? -value : value;
    const isPositive = value > 0;

    const msg: string[] = [];
    const bytes = bigIntToBytes(val);
    const lenBytes = integerToBytes(bytes.length);
    // type byte
    msg.push(toCode(
        ETypeByteCode.BigInt | (0b0000_0111 & lenBytes.length) | (isPositive ? 0 : 0b0000_1000)
    ));
    // length bytes
    msg.push(toCode(...lenBytes));
    // encode bytes
    msg.push(toCode(...bytes.map((i) => Number(i))));

    return msg.join('');
};
