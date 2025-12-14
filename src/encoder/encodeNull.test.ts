import { encodeNull } from './encodeNull';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'
import { BytesWriter } from '../writer/BytesWriter';

describe('encodeNull', () => {

    it('should encode Null correct', () => {
        const writer = new BytesWriter();
        encodeNull(writer);
        expectAsBinaryString(writer.toString()).toBe('00000010');
    });

});