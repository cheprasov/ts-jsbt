import { delaySender } from '../_tests/utils/delaySender';
import { encodeDate } from '../encoder/encodeDate';
import ByteStream from '../reader/ByteStream';
import { decodeDateStream } from './decodeDateStream';

describe('decodeDateStream', () => {

    it('should decode integer correct', async () => {
        const stream = new ByteStream();
        delaySender(stream, [
            encodeDate(new Date(42)),
            encodeDate(new Date(-42)),
            encodeDate(new Date(0)),
            encodeDate(new Date(1)),
            encodeDate(new Date(-1)),
            encodeDate(new Date(1_234_567_890)),
            encodeDate(new Date(-1_234_567_890)),
        ]);

        expect(await decodeDateStream(await stream.readStreamByte(), stream)).toEqual(new Date(42));
        expect(await decodeDateStream(await stream.readStreamByte(), stream)).toEqual(new Date(-42));
        expect(await decodeDateStream(await stream.readStreamByte(), stream)).toEqual(new Date(0));
        expect(await decodeDateStream(await stream.readStreamByte(), stream)).toEqual(new Date(1));
        expect(await decodeDateStream(await stream.readStreamByte(), stream)).toEqual(new Date(-1));
        expect(await decodeDateStream(await stream.readStreamByte(), stream)).toEqual(new Date(1_234_567_890));
        expect(await decodeDateStream(await stream.readStreamByte(), stream)).toEqual(new Date(-1_234_567_890));
    });

});