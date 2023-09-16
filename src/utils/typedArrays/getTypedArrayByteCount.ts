import { TTypedArray } from '../../types/TTypedArray';

export const getBytesPerElement = (arr: TTypedArray): 1 | 2 | 4 | 8 => {
    if (arr instanceof ArrayBuffer) {
        return 1;
    }
    return arr.BYTES_PER_ELEMENT as 1 | 2 | 4 | 8 ;
};
