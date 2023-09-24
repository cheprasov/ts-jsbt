import { encodeSymbol } from '../encoder/encodeSymbol';
import ByteStream from '../reader/ByteStream';
import { decodeSymbol } from './decodeSymbol';

describe('decodeSymbol', () => {

    it('should decode string correct', () => {
        const stream = new ByteStream([
            encodeSymbol(Symbol.for('Alex 42')),
            encodeSymbol(Symbol.for('')),
            encodeSymbol(Symbol.for('🇬🇧')),
            encodeSymbol(Symbol.for('I💖JS')),
            encodeSymbol(Symbol.for('I💖JS'.repeat(35))),
        ]);
        stream.completeStream();

        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for('Alex 42'));
        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for(''));
        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for('🇬🇧'));
        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for('I💖JS'));
        expect(decodeSymbol(stream.readByte(), stream)).toBe(Symbol.for('I💖JS'.repeat(35)));
    });

});