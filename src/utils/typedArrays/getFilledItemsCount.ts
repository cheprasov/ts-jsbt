import { TTypedArray } from '../../types/TTypedArray';

export const getFilledItemsCount = (arr: TTypedArray): number => {
    let count = 0;
    const tarr = (arr instanceof ArrayBuffer) ? new Uint8Array(arr) : arr;
    tarr.forEach((item) => {
        if (item !== 0) {
            count += 1
        }
    });
    return count;
}
