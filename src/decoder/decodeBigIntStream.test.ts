import { delaySender } from '../_tests/utils/delaySender';
import { encodeBigInt } from '../encoder/encodeBigInt';
import ByteStream from '../reader/ByteStream';
import { decodeBigIntStream } from './decodeBigIntStream';

describe('decodeBigIntStream', () => {

    it('should decode bigint correct', async () => {
        const stream = new ByteStream()

        delaySender(stream, [
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

        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(42n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(-42n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(0n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(-0n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(1n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(-1n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(1_234_567_890n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(-1_234_567_890n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(9007199254740990n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(9007199254740991n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(-9007199254740991n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(12345678901234567890n);
        expect(await decodeBigIntStream(await stream.readStreamByte(), stream)).toBe(-12345678901234567890n);
    });

});