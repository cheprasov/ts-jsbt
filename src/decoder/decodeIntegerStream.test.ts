import { delaySender } from '../_tests/utils/delaySender';
import { encodeInteger } from '../encoder/encodeInteger';
import ByteStream from '../reader/ByteStream';
import { decodeIntegerStream } from './decodeIntegerStream';

describe('decodeIntegerStream', () => {

    it('should decode integer correct', async () => {
        const stream = new ByteStream();
        delaySender(stream, [
            encodeInteger(42),
            encodeInteger(-42),
            encodeInteger(0),
            encodeInteger(-0),
            encodeInteger(1),
            encodeInteger(-1),
            encodeInteger(1_234_567_890),
            encodeInteger(-1_234_567_890),
            encodeInteger(9007199254740990),
            encodeInteger(9007199254740991),
            encodeInteger(-9007199254740991),
        ]);

        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(42);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(-42);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(0);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(-0);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(1);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(-1);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(1_234_567_890);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(-1_234_567_890);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(9007199254740990);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(9007199254740991);
        expect(await decodeIntegerStream(await stream.readStreamByte(), stream)).toBe(-9007199254740991);
    });

});