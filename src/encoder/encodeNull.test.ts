import { encodeNull } from './encodeNull';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'

describe('encodeNull', () => {

    it('should encode Null correct', () => {
        expectAsBinaryString(encodeNull()).toBe('00000010');
    });

});