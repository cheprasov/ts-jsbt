import { getFilledItemsCount } from './getFilledItemsCount';

describe('getFilledItemsCount', () => {
    it('should return correct count of empty items in array', () => {
        expect(getFilledItemsCount([1, 2, 3])).toBe(3);
        expect(getFilledItemsCount([1, 2, 3, , 5])).toBe(4);

        const ar = []; ar[100] = 42;
        expect(getFilledItemsCount(ar)).toBe(1);
        expect(ar.length).toBe(101);
    });
});
