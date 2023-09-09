import { encodeUndefined } from './encodeUndefined';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'

describe('encodeUndefined', () => {

    it('should encode Undefined correct', () => {
        expectAsBinaryString(encodeUndefined()).toBe('00000011');
    });

});