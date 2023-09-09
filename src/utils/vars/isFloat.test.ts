import { isFloat } from './isFloat';

describe('isFloat', () => {
    it('should return TRUE for float numbers', () => {
        expect(isFloat(0.00000001)).toBeTruthy();
        expect(isFloat(1.1)).toBeTruthy();
        expect(isFloat(1.999999999)).toBeTruthy();
        expect(isFloat(3.14)).toBeTruthy();
        expect(isFloat(0.000001)).toBeTruthy();
        expect(isFloat(-1.1)).toBeTruthy();
        expect(isFloat(1.44)).toBeTruthy();
    });

    it('should return FALSE for float numbers', () => {
        expect(isFloat(0)).toBeFalsy();
        expect(isFloat(1)).toBeFalsy();
        expect(isFloat(-1)).toBeFalsy();
        expect(isFloat(42)).toBeFalsy();
        expect(isFloat(-42)).toBeFalsy();
        expect(isFloat(NaN)).toBeFalsy();
        expect(isFloat('1.1')).toBeFalsy();
        expect(isFloat(true)).toBeFalsy();
    });
});