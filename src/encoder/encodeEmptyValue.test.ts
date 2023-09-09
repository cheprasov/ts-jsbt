import { encodeEmptyValue } from './encodeEmptyValue';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'

describe('encodeEmptyValue', () => {

    it('should encode Empty Value correct', () => {
        expectAsBinaryString(encodeEmptyValue()).toBe('00000111');
    });

});