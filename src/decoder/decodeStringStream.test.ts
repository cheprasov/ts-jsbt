import { delaySender } from '../_tests/utils/delaySender';
import { encodeString } from '../encoder/encodeString';
import ByteStream from '../reader/ByteStream';
import { decodeStringStream } from './decodeStringStream';

describe('decodeStringStream', () => {
    it('should decode string correct', async () => {
        const stream = new ByteStream();
        delaySender(stream, [
            encodeString('Alex 42'),
            encodeString(''),
            encodeString('🇬🇧'),
            encodeString('I💖JS'),
            encodeString('I💖JS'.repeat(35)),
        ]);

        expect(await decodeStringStream(await stream.readStreamByte(), stream)).toBe('Alex 42');
        expect(await decodeStringStream(await stream.readStreamByte(), stream)).toBe('');
        expect(await decodeStringStream(await stream.readStreamByte(), stream)).toBe('🇬🇧');
        expect(await decodeStringStream(await stream.readStreamByte(), stream)).toBe('I💖JS');
        expect(await decodeStringStream(await stream.readStreamByte(), stream)).toBe('I💖JS'.repeat(35));
    });
});
