import { delaySender } from '../_tests/utils/delaySender';
import { encodeFloat } from '../encoder/encodeFloat';
import ByteStream from '../reader/ByteStream';
import { decodeFloatStream } from './decodeFloatStream';

describe('decodeFloatStream', () => {
    it('should decode float correct', async () => {
        const stream = new ByteStream();
        delaySender(stream, [
            encodeFloat(1.0000000000000002, false),
            encodeFloat(1.0000000000000002, true),
            encodeFloat(-1.0000000000000002, false),
            encodeFloat(-1.0000000000000002, true),
            encodeFloat(156.25, false),
            encodeFloat(-156.25, false),
            encodeFloat(3.141592653589793, false),
            encodeFloat(-3.141592653589793, false),
            encodeFloat(17.75, false),
            encodeFloat(-17.75, false),
            encodeFloat(5e-324, false),
            encodeFloat(5e-324, true),
            encodeFloat(-5e-324, true),
        ]);

        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(1.0000000000000002);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(1.0000000000000002);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(-1.0000000000000002);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(-1.0000000000000002);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(156.25);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(-156.25);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(3.141592653589793);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(-3.141592653589793);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(17.75);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(-17.75);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(5e-324);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(5e-324);
        expect(await decodeFloatStream(await stream.readStreamByte(), stream)).toBe(-5e-324);
    });
});
