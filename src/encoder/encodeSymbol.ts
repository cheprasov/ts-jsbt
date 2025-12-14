import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { getBytesSizeForString } from '../converter/getBytesSizeForString';
import { integerToBytes } from '../converter/integerToBytes';
import { IDataWriter } from '../writer/IDataWriter';
import { binaryStringToUint8Array } from '../utils/strings/binaryStringToUint8Array';

export const encodeSymbol = (value: symbol, writer: IDataWriter): number => {
    if (typeof value !== 'symbol') {
        throw new Error(`Expecting "symbol" type, received "${String(value)}" (${typeof value})`);
    }

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
    writer.pushByte(ETypeByteCode.Symbol | (0b0000_0111 & bytes.length));

    if (bytes.length) {
        // length bytes
        writer.pushBytes(bytes);
    }
    if (key) {
        const encoder = new TextEncoder();
        const encodeBytes = encoder.encode(key);
        //const encodeBytes = binaryStringToUint8Array(key);
        // encode bytes
        writer.pushBytes(encodeBytes);
    }

    return writer.getOffset();
}