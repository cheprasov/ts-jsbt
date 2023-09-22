import { encodeInteger } from '../encoder/encodeInteger';
import { encodeString } from '../encoder/encodeString';
import ByteStream from '../reader/ByteStream';
import { decodeInteger } from './decodeInteger';

describe('decodeInteger', () => {

    it('should decode integer correct', () => {
        const stream = new ByteStream([
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
        stream.completeStream();

        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(42);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(-42);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(0);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(-0);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(1);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(-1);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(1_234_567_890);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(-1_234_567_890);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(9007199254740990);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(9007199254740991);
        expect(decodeInteger(stream.readBytes(1)[0], stream)).toBe(-9007199254740991);
    });

});