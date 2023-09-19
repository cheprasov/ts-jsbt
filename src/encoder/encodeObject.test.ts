import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeObject } from './encodeObject';

describe('encodeObject', () => {
    it('should encode object correctly', () => {
        expectAsBinaryString(encodeObject({})).toEqual('01110000');
        expectAsBinaryString(
            encodeObject({
                42: 'baz',
                foo: 'bar',
            })
        ).toEqual(
            '01110001 00000010 ' +
            // 42
            '00010001 00000010 00110100 00110010 ' +
            // baz
            '00010001 00000011 01100010 01100001 01111010 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            // bar
            '00010001 00000011 01100010 01100001 01110010'
        );
    });
});
