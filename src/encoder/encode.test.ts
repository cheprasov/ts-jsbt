import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { encode } from './encode';
import { createEncodeOptions } from './options/createEncodeOptions';

describe('encode', () => {
    let options: IEncodeOptions;

    beforeEach(() => {
        options = createEncodeOptions();
        options.refs = {
            enabled: true,
        };
    });

    it('should create correct refs', () => {
        const obj: any = {
            foo: 'bar',
            baz: 1_000_000,
            ar1: [1, 2, 3, 1_000_000],
            ar2: [1, 2, 3, 1_000_000],
            ar3: [1, 2, 3, 1_000_000],
        };
        obj.ar4 = obj.ar3;

        const res = encode(obj, options);

        expectAsBinaryString(res).toBe(
            // obj, refId = 0
            '01110001 00000110 ' +
            // foo, refId = 1
            '00010001 00000011 01100110 01101111 01101111 ' +
            // bar, refId = 2
            '00010001 00000011 01100010 01100001 01110010 ' +
            // baz, refId = 3
            '00010001 00000011 01100010 01100001 01111010 ' +
            // 1_000_000, refId = 4
            '00100011 01000000 01000010 00001111 ' +
            // ar1, refId = 5
            '00010001 00000011 01100001 01110010 00110001 ' +
            // [ ... ], refId = 6
            '01010001 00000100 ' +
            // 1
            '00100001 00000001 ' +
            // 2
            '00100001 00000010 ' +
            // 3
            '00100001 00000011 ' +
            // link ref to 4
            '10110001 00000100 ' +
            // ar2, refId = 7
            '00010001 00000011 01100001 01110010 00110010 ' +
            // copy ref of 6, refId = 8
            '10111001 00000110 ' +
            // ar3, refId = 9
            '00010001 00000011 01100001 01110010 00110011 ' +
            // copy ref of 6, refId = 10
            '10111001 00000110 ' +
            // arr4, refId = 11
            '00010001 00000011 01100001 01110010 00110100 ' +
            // link ref to 10
            '10110001 00001010'
        );

        const { refMap } = options.context;

        expect(refMap.size).toBe(12);

        expect(refMap.get(obj)?.refId).toBe(0);
        expect(refMap.get('foo')?.refId).toBe(1);
        expect(refMap.get('bar')?.refId).toBe(2);
        expect(refMap.get('baz')?.refId).toBe(3);
        expect(refMap.get(1_000_000)?.refId).toBe(4);
        expect(refMap.get('ar1')?.refId).toBe(5);
        expect(refMap.get(obj.ar1)?.refId).toBe(6);
        expect(refMap.get('ar2')?.refId).toBe(7);
        expect(refMap.get(obj.ar2)?.refId).toBe(8);
        expect(refMap.get('ar3')?.refId).toBe(9);
        expect(refMap.get(obj.ar3)?.refId).toBe(10);
        expect(refMap.get('ar4')?.refId).toBe(11);

        expect(refMap.get(obj.ar3)?.encodedRefCopy).not.toBeNull();
    });
});
