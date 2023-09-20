import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeMap } from './encodeMap';
import { createEncodeOptions } from './options/createEncodeOptions';

describe('encodeMap', () => {
    it('should encode object correctly', () => {
        expectAsBinaryString(encodeMap(new Map(), createEncodeOptions())).toEqual('10010000');
        expectAsBinaryString(
            encodeMap(new Map<any, any>([
                [42, 'baz'],
                ['foo', 'bar'],
            ]), createEncodeOptions())
        ).toEqual(
            '10010001 00000010 ' +
            // 42
            '00100001 00101010 ' +
            // baz
            '00010001 00000011 01100010 01100001 01111010 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            // bar
            '00010001 00000011 01100010 01100001 01110010'
        );

        expectAsBinaryString(
            encodeMap(new Map<any, any>([
                ['foo', 42],
                ['bar', null],
                ['baz', true],
            ]), createEncodeOptions())
        ).toEqual(
            '10010001 00000011 ' +
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
            encodeMap(new Map<any, any>([
                [
                    'foo',
                    new Map<any, any>([
                        ['bar', 42],
                        [
                            'baz',
                            new Map<any, any>([
                                ['foo', 43]
                            ])
                        ],
                    ]),
                ]
            ]), createEncodeOptions())
        ).toEqual(
            '10010001 00000001 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            '10010001 00000010 ' +
            // bar
            '00010001 00000011 01100010 01100001 01110010 ' +
            // 42
            '00100001 00101010 ' +
            // baz
            '00010001 00000011 01100010 01100001 01111010 ' +
            '10010001 00000001 ' +
            // foo
            '00010001 00000011 01100110 01101111 01101111 ' +
            // 43
            '00100001 00101011'
        );
    });
});
