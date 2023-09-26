import { JSBT } from '../../JSBT';
import ByteStream from '../../reader/ByteStream';
import { data } from './jsbt-real-world-data.test';


describe('Real World Data Structure', () => {
    it('should encode and decode the object correct', async () => {
        const jsbt = JSBT.encode(data);
        const split = jsbt.split('');
        const stream = new ByteStream();
        for (let i = 0; i < split.length; i += 1) {
            setTimeout(() => {
                stream.addMessage(split[i]);
            }, i * 5);
        }
        const res = await JSBT.decodeStream(stream);
        expect(res).toEqual(data);
        expect(res).not.toBe(data);
    }, 35_000);
});
