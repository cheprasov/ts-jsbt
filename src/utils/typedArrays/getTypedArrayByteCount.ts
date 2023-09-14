import { TTypedArray } from '../../types/TTypedArray';

export const getBytesPerElement = (arr: TTypedArray): number => {
    if (arr instanceof ArrayBuffer) {
        return 1;
    }
    return arr.BYTES_PER_ELEMENT;
};
