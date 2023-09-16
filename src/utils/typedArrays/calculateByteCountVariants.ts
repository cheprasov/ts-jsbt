import { integerToBytes } from '../../converter/integerToBytes';
import { TTypedArray } from '../../types/TTypedArray';
import { getBytesPerElement } from './getTypedArrayByteCount';

interface IResults {
    envValueSize: number;
    encKeyValueSize: number;
}

export const calculateByteCountVariants = (tarr: TTypedArray): IResults => {
    const arr = tarr instanceof ArrayBuffer ? new Uint8Array(tarr) : tarr;
    const bytesPerElement = getBytesPerElement(arr);

    const resutls: IResults = {
        envValueSize: arr.byteLength,
        encKeyValueSize: 0,
    }

    for (let i = 0; i < arr.length; i += 1) {
        const num = arr[i];
        if (num) {
            const bytes = integerToBytes(i);
            resutls.encKeyValueSize +=
                /* type */ 1
                + /* int */ + (i > 0 ? bytes.length : 0)
                + bytesPerElement;
        }
    }

    return resutls;
}