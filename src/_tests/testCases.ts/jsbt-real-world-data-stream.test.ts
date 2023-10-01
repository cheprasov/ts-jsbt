import { JSBT } from '../../JSBT';
import ByteStream from '../../reader/ByteStream';
import { delaySender } from '../utils/delaySender';
import { data } from './jsbt-real-world-data.test';

describe('Real World Data Structure', () => {
    it('should encode and decode the object correct', async () => {
        const jsbt = JSBT.encode(data);
        const stream = new ByteStream();

        delaySender(stream, [jsbt], 2);
        const res = await JSBT.decodeStream(stream);
        const u1 = data.userA.toJSBT();
        const u2 = data.userD.toJSBT();
        expect(res).toEqual({
            ...data,
            userA: u1,
            userB: u1,
            userC: u1,
            userD: u2,
            userE: u2,
        });
        expect(res).not.toBe(data);
    }, 35_000);
});
