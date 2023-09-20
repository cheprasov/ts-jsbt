import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeSet } from './encodeSet';
import { createEncodeOptions } from './options/createEncodeOptions';

describe('encodeSet', () => {
    it('should encode object correctly', () => {
        expectAsBinaryString(encodeSet(new Set(), createEncodeOptions())).toEqual('10000000');
        expectAsBinaryString(
            encodeSet(new Set(['42', 'baz', 'foo', 'bar']), createEncodeOptions())
        ).toEqual(
            '10000001 00000100 ' +
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
            encodeSet(new Set([
                'foo',
                new Set([
                    'bar',
                    42,
                    new Set(['foo', 43]),
                ]),
            ]), createEncodeOptions())
        ).toEqual(
            '10000001 00000010 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            '10000001 00000011 ' +
            // bar
            '00010001 00000011 01100010 01100001 01110010 ' +
            // 42
            '00100001 00101010 ' +
            '10000001 00000010 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            // 43
            '00100001 00101011'
        );
    });
});
