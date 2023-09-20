import { JSBT } from './JSBT';
import { expectAsBinaryString } from './_tests/utils/expectAsBinaryString';

describe('JSBT', () => {
    describe('encode', () => {
        it('should encode value correctly', () => {
            const obj: any = {
                userA: {
                    name: 'Alex',
                },
                userB: {
                    name: 'Alex',
                },
                userC: {
                    name: 'Alex',
                },
            };
            obj.userD = obj.userC;

            expectAsBinaryString(JSBT.encode(obj)).toEqual(
                // root object, refID 0
                '01110001 00000100 ' +
                // userA key, refID 1
                '00010001 00000101 01110101 01110011 01100101 01110010 01000001 ' +
                // userA object, refID 2
                '01110001 00000001 ' +
                // name refID 3
                '00010001 00000100 01101110 01100001 01101101 01100101 ' +
                // Alex refID 4
                '00010001 00000100 01000001 01101100 01100101 01111000 ' +
                // userB key refID 5
                '00010001 00000101 01110101 01110011 01100101 01110010 01000010 ' +
                // userB object refID 6
                '01110001 00000001 ' +
                // ref name
                '10110001 00000011 ' +
                // ref Alex
                '10110001 00000100 ' +
                // userC key // refID 7
                '00010001 00000101 01110101 01110011 01100101 01110010 01000011 ' +
                // copy ref to userB object // refID 8
                '10111001 00000110 ' +
                // userD key // refID 9
                '00010001 00000101 01110101 01110011 01100101 01110010 01000100 ' +
                // link ref to userC object
                '10110001 00001000'
            );

            console.time('JSBT');
            const jsbt = JSBT.encode(obj);
            console.timeEnd('JSBT');

            console.time('JSON');
            const json = JSON.stringify(obj);
            console.timeEnd('JSON');

            console.log('JSBT', 'len', jsbt.length, '\n', '\n');
            console.log('JSON', 'len', json.length, '\n', '\n');
        });
    });
});
