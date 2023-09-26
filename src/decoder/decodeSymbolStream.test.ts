import { delaySender } from '../_tests/utils/delaySender';
import { encodeSymbol } from '../encoder/encodeSymbol';
import ByteStream from '../reader/ByteStream';
import { decodeSymbolStream } from './decodeSymbolStream';

describe('decodeSymbolStream', () => {

    it('should decode string correct', async () => {
        const stream = new ByteStream();
        delaySender(stream, [
            encodeSymbol(Symbol.for('Alex 42')),
            encodeSymbol(Symbol.for('')),
            encodeSymbol(Symbol.for('🇬🇧')),
            encodeSymbol(Symbol.for('I💖JS')),
            encodeSymbol(Symbol.for('I💖JS'.repeat(35))),
        ]);

        expect(await decodeSymbolStream(await stream.readStreamByte(), stream)).toBe(Symbol.for('Alex 42'));
        expect(await decodeSymbolStream(await stream.readStreamByte(), stream)).toBe(Symbol.for(''));
        expect(await decodeSymbolStream(await stream.readStreamByte(), stream)).toBe(Symbol.for('🇬🇧'));
        expect(await decodeSymbolStream(await stream.readStreamByte(), stream)).toBe(Symbol.for('I💖JS'));
        expect(await decodeSymbolStream(await stream.readStreamByte(), stream)).toBe(Symbol.for('I💖JS'.repeat(35)));
    });

});