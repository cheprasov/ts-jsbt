import { JSBT } from '../../JSBT';
import ByteStream from '../../reader/ByteStream';
import { User } from '../classes/User';
import { delaySender } from '../utils/delaySender';

const user1 = new User('Alex', 'alex@test.com');
const user2 = new User('Test', 'test@test.com');

export const users = {
    userA: user1,
    userB: user1,
    userC: user1,
    userD: user2,
    userE: user2,
};

describe('Real World Data Structure', () => {
    it('should encode and decode the object correct', async () => {
        const stream = new ByteStream();
        delaySender(stream, [JSBT.encode(users)]);

        const res = await JSBT.decodeStream(stream);

        const u1 = user1.toJSBT();
        const u2 = user2.toJSBT();

        expect(res).toEqual({
            userA: u1,
            userB: u1,
            userC: u1,
            userD: u2,
            userE: u2,
        });

        expect(res.userA.__jsbtConstructorName).toBe('User');
        expect(res.userB.__jsbtConstructorName).toBe('User');
        expect(res.userC.__jsbtConstructorName).toBe('User');
        expect(res.userD.__jsbtConstructorName).toBe('User');
        expect(res.userE.__jsbtConstructorName).toBe('User');

        expect(res.userA).toBe(res.userB);
        expect(res.userB).toBe(res.userC);
        expect(res.userA).not.toBe(res.userD);
        expect(res.userD).toBe(res.userE);

        expect(res).not.toBe(users);
    });
});
