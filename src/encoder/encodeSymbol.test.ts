import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { BytesWriter } from '../writer/BytesWriter';
import { encodeSymbol } from './encodeSymbol';

describe('encodeSymbol', () => {
    it('should encode string correct', () => {
        let writer = new BytesWriter();
        encodeSymbol(Symbol.for(''), writer);
        expectAsBinaryString(writer.toString()).toBe('10100000');

        writer = new BytesWriter();
        encodeSymbol(Symbol.for('Alex'), writer)
        expectAsBinaryString(writer.toString()).toBe(
            '10100001 00000100 01000001 01101100 01100101 01111000'
        );

        writer = new BytesWriter();
        encodeSymbol(Symbol.for('🇬🇧'), writer);
        expectAsBinaryString(writer.toString(), ' ', '.').toBe(
            '10100001 00001000 11110000 10011111 10000111 10101100 11110000 10011111 10000111 10100111'
        );

        writer = new BytesWriter();
        encodeSymbol(Symbol.for('I💖JS'), writer);
        expectAsBinaryString(writer.toString(), ' ', '.').toBe(
            '10100001 00000111 01001001 11110000 10011111 10010010 10010110 01001010 01010011'
        );

        writer = new BytesWriter();
        encodeSymbol(Symbol.for('I💖JS '.repeat(35)), writer)
        expectAsBinaryString(writer.toString(), ' ', '.').toBe(
            '10100010 00011000 00000001' +
                ' 01001001 11110000 10011111 10010010 10010110 01001010 01010011 00100000'.repeat(35)
        );
    });

    it('should throw error on incorrect type', () => {
        const writer = new BytesWriter();
        expect(() => {
            encodeSymbol(1 as any, writer);
        }).toThrowError();
    });
});
