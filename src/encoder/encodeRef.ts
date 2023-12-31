import { ETypeByteCode } from '../enums/ETypeByteCode';
import { MAX_7_BYTES_INTEGER } from '../constants';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { toChar } from '../utils/toChar';
import { integerToBytes } from '../converter/integerToBytes';
import { isInteger } from '../utils/vars/isInteger';

export const encodeRef = (mode: 'copy' | 'link', refId: number, options: IEncodeOptions): string => {
    if (!isInteger(refId)) {
        throw new Error(`Expecting "integer" type, received "${refId}" (${typeof refId})`);
    }
    if (Math.abs(refId) > MAX_7_BYTES_INTEGER) {
        throw new Error(`Can not encode unsafe integer`);
    }

    const msg: string[] = [];
    const bytes = integerToBytes(refId);

    // type byte
    msg.push(toChar(
        ETypeByteCode.Refs
        | (mode === 'copy' ? 0b0000_1000 : 0)
        | (0b0000_0111 & bytes.length)
    ));
    // encode bytes
    msg.push(toChar(...bytes));

    return msg.join('');
};
