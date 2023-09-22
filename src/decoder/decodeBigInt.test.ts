import { encodeBigInt } from '../encoder/encodeBigInt';
import ByteStream from '../reader/ByteStream';
import { decodeBigInt } from './decodeBigInt';

describe('decodeBigInt', () => {

    it('should decode bigint correct', () => {
        const stream = new ByteStream([
            encodeBigInt(42n),
            encodeBigInt(-42n),
            encodeBigInt(0n),
            encodeBigInt(-0n),
            encodeBigInt(1n),
            encodeBigInt(-1n),
            encodeBigInt(1_234_567_890n),
            encodeBigInt(-1_234_567_890n),
            encodeBigInt(9007199254740990n),
            encodeBigInt(9007199254740991n),
            encodeBigInt(-9007199254740991n),
            encodeBigInt(12345678901234567890n),
            encodeBigInt(-12345678901234567890n),
        ]);
        stream.completeStream();

        expect(decodeBigInt(stream.readByte(), stream)).toBe(42n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(-42n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(0n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(-0n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(1n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(-1n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(1_234_567_890n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(-1_234_567_890n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(9007199254740990n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(9007199254740991n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(-9007199254740991n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(12345678901234567890n);
        expect(decodeBigInt(stream.readByte(), stream)).toBe(-12345678901234567890n);
    });

});