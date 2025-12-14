import { encodeNaN } from './encodeNaN';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'
import { BytesWriter } from '../writer/BytesWriter';

describe('encodeNaN', () => {

    it('should encode NaN correct', () => {
        const writer = new BytesWriter();
        encodeNaN(writer);
        expectAsBinaryString(writer.toString()).toBe('00000100');
    });

});