import { encodeSymbol } from '../encoder/encodeSymbol';
import ByteStream from '../reader/ByteStream';
import { BytesWriter } from '../writer/BytesWriter';
import { decodeSymbol } from './decodeSymbol';

describe('decodeSymbol', () => {
    it('should decode string correct', () => {
        const writer = new BytesWriter();
        encodeSymbol(Symbol.for('Alex 42'), writer);
        encodeSymbol(Symbol.for(''), writer);
        encodeSymbol(Symbol.for('🇬🇧'), writer);
        encodeSymbol(Symbol.for('I💖JS'), writer);
        encodeSymbol(Symbol.for('I💖JS'.repeat(35)), writer);

        const stream = new ByteStream(writer.toString());
        stream.completeStream();

        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for('Alex 42'));
        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for(''));
        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for('🇬🇧'));
        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for('I💖JS'));
        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for('I💖JS'.repeat(35)));
    });
});
