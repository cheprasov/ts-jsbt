import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { getBytesSizeForString } from '../converter/getBytesSizeForString';
import { integerToBytes } from '../converter/integerToBytes';
import { toChar } from '../utils/toChar';

export const encodeSymbol = (value: symbol): string => {
    if (typeof value !== 'symbol') {
        throw new Error(`Expecting "symbol" type, received "${String(value)}" (${typeof value})`);
    }

    const msg: string[] = [];

    const key = Symbol.keyFor(value);

    if (key === undefined) {
        throw new Error(`Not found key for symbol ${String(value)}`);
    }

    const bytesCount = getBytesSizeForString(key);
    if (bytesCount > MAX_7_BYTES_INTEGER) {
        throw new Error(`Too large symbol key. ${bytesCount} bytes, limit ${MAX_7_BYTES_INTEGER}`);
    }
    const bytes = integerToBytes(bytesCount)
    // type byte
    msg.push(toChar(ETypeByteCode.Symbol | (0b0000_0111 & bytes.length)));

    if (bytes.length) {
        // length bytes
        msg.push(toChar(...bytes));
    }
    if (key) {
        // encode bytes
        msg.push(key);
    }

    return msg.join('');
}