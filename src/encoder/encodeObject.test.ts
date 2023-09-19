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
            // '42'
            '00010001 00000010 00110100 00110010 ' +
            // baz
            '00010001 00000011 01100010 01100001 01111010 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            // bar
            '00010001 00000011 01100010 01100001 01110010'
        );

        expectAsBinaryString(
            encodeObject({
                foo: 42,
                bar: null,
                baz: true,
            })
        ).toEqual(
            '01110001 00000011 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            // 42
            '00100001 00101010 ' +
            // bar
            '00010001 00000011 01100010 01100001 01110010 ' +
            // null
            '00000010 ' +
            // baz
            '00010001 00000011 01100010 01100001 01111010 ' +
            // true
            '00000001'
        );

        expectAsBinaryString(
            encodeObject({
                foo: {
                    bar: 42,
                    baz: {
                        foo: 43
                    },
                },
            })
        ).toEqual(
            '01110001 00000001 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            '01110001 00000010 ' +
            // bar
            '00010001 00000011 01100010 01100001 01110010 ' +
            // 42
            '00100001 00101010 ' +
            // baz
            '00010001 00000011 01100010 01100001 01111010 ' +
            '01110001 00000001 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            // 43
            '00100001 00101011'
        );
    });
});
