import { encodeFloat } from '../encoder/encodeFloat';
import ByteStream from '../reader/ByteStream';
import { decodeFloat } from './decodeFloat';

describe('decodeFloat', () => {
    it('should decode float correct', () => {
        const stream = new ByteStream([
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
        stream.completeStream();

        expect(decodeFloat(stream.readByte(), stream)).toBe(1.0000000000000002);
        expect(decodeFloat(stream.readByte(), stream)).toBe(1.0000000000000002);
        expect(decodeFloat(stream.readByte(), stream)).toBe(-1.0000000000000002);
        expect(decodeFloat(stream.readByte(), stream)).toBe(-1.0000000000000002);
        expect(decodeFloat(stream.readByte(), stream)).toBe(156.25);
        expect(decodeFloat(stream.readByte(), stream)).toBe(-156.25);
        expect(decodeFloat(stream.readByte(), stream)).toBe(3.141592653589793);
        expect(decodeFloat(stream.readByte(), stream)).toBe(-3.141592653589793);
        expect(decodeFloat(stream.readByte(), stream)).toBe(17.75);
        expect(decodeFloat(stream.readByte(), stream)).toBe(-17.75);
        expect(decodeFloat(stream.readByte(), stream)).toBe(5e-324);
        expect(decodeFloat(stream.readByte(), stream)).toBe(5e-324);
        expect(decodeFloat(stream.readByte(), stream)).toBe(-5e-324);
    });
});
