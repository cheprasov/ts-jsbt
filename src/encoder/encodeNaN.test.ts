import { encodeNaN } from './encodeNaN';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'

describe('encodeNaN', () => {

    it('should encode NaN correct', () => {
        expectAsBinaryString(encodeNaN()).toBe('00000100');
    });

});