import { encodeDate } from '../encoder/encodeDate';
import ByteStream from '../reader/ByteStream';
import { decodeDate } from './decodeDate';

describe('decodeDate', () => {

    it('should decode integer correct', () => {
        const stream = new ByteStream([
            encodeDate(new Date(42)),
            encodeDate(new Date(-42)),
            encodeDate(new Date(0)),
            encodeDate(new Date(1)),
            encodeDate(new Date(-1)),
            encodeDate(new Date(1_234_567_890)),
            encodeDate(new Date(-1_234_567_890)),
        ]);
        stream.completeStream();

        expect(decodeDate(stream.readByte(), stream)).toEqual(new Date(42));
        expect(decodeDate(stream.readByte(), stream)).toEqual(new Date(-42));
        expect(decodeDate(stream.readByte(), stream)).toEqual(new Date(0));
        expect(decodeDate(stream.readByte(), stream)).toEqual(new Date(1));
        expect(decodeDate(stream.readByte(), stream)).toEqual(new Date(-1));
        expect(decodeDate(stream.readByte(), stream)).toEqual(new Date(1_234_567_890));
        expect(decodeDate(stream.readByte(), stream)).toEqual(new Date(-1_234_567_890));
    });

});