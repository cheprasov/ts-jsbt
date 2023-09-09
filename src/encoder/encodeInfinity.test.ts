import { encodeInfinity } from './encodeInfinity';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'

describe('encodeInfinity', () => {

    it('should encode positive infinity correct', () => {
        expectAsBinaryString(encodeInfinity(Infinity)).toBe('00000101');
    });

    it('should encode negative infinity correct', () => {
        expectAsBinaryString(encodeInfinity(-Infinity)).toBe('00000110');
    });

    it('should throw error on incorrect type', () => {
        expect(() => {
            encodeInfinity(NaN);
        }).toThrowError()
    });
});