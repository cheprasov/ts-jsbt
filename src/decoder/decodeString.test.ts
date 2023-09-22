import { encodeString } from '../encoder/encodeString';
import ByteStream from '../reader/ByteStream';
import { decodeString } from './decodeString';

describe('decodeString', () => {

    it('should decode string correct', () => {
        const stream = new ByteStream([
            encodeString('Alex 42'),
            encodeString(''),
            encodeString('🇬🇧'),
            encodeString('I💖JS'),
            encodeString('I💖JS'.repeat(35)),
        ]);
        stream.completeStream();

        expect(decodeString(stream.readByte(), stream)).toBe('Alex 42');
        expect(decodeString(stream.readByte(), stream)).toBe('');
        expect(decodeString(stream.readByte(), stream)).toBe('🇬🇧');
        expect(decodeString(stream.readByte(), stream)).toBe('I💖JS');
        expect(decodeString(stream.readByte(), stream)).toBe('I💖JS'.repeat(35));
    });

});