import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { integerToBytes } from '../converter/integerToBytes';
import { isInteger } from '../utils/vars/isInteger';
import { IDataWriter } from '../writer/IDataWriter';

export const encodeRef = (mode: 'copy' | 'link', refId: number, writer: IDataWriter): number => {
    if (!isInteger(refId)) {
        throw new Error(`Expecting "integer" type, received "${refId}" (${typeof refId})`);
    }
    if (Math.abs(refId) > MAX_7_BYTES_INTEGER) {
        throw new Error(`Can not encode unsafe integer`);
    }

    const bytes = integerToBytes(refId);

    // type byte
    writer.pushByte(
        ETypeByteCode.Refs
        | (mode === 'copy' ? 0b0000_1000 : 0)
        | (0b0000_0111 & bytes.length)
    );
    // encode bytes
    return writer.pushBytes(bytes);
};
