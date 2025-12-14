import { encodeString } from '../encoder/encodeString';
import ByteStream from '../reader/ByteStream';
import { BytesWriter } from '../writer/BytesWriter';
import { decodeString } from './decodeString';

describe('decodeString', () => {

    it('should decode string correct', () => {
        const writer = new BytesWriter();
        encodeString('Alex 42', writer);
        encodeString('', writer);
        encodeString('🇬🇧', writer);
        encodeString('I💖JS', writer);
        encodeString('I💖JS'.repeat(35), writer);

        const stream = new ByteStream(writer.toString());
        stream.completeStream();

        expect(decodeString(stream.readByte(), stream)).toBe('Alex 42');
        expect(decodeString(stream.readByte(), stream)).toBe('');
        expect(decodeString(stream.readByte(), stream)).toBe('🇬🇧');
        expect(decodeString(stream.readByte(), stream)).toBe('I💖JS');
        expect(decodeString(stream.readByte(), stream)).toBe('I💖JS'.repeat(35));
    });

});