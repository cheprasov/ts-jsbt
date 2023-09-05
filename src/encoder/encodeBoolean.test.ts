import { encodeBoolean } from './encodeBoolean';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'

describe('encodeBoolean', () => {

    it('should encode TRUE correct', () => {
        expectAsBinaryString(encodeBoolean(true)).toBe('00000001');
    });

    it('should encode FALSE correct', () => {
        expectAsBinaryString(encodeBoolean(false)).toBe('00000000');
    });

    it('should throw error on incorrect type', () => {
        expect(() => {
            encodeBoolean(1 as any);
        }).toThrowError()
    });
});