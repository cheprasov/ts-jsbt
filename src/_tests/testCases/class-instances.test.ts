import { JSBT } from '../../JSBT';
import { User } from '../classes/User';
import { expectAsBinaryString } from '../utils/expectAsBinaryString';

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
    it('should encode and decode the object correct', () => {
        const jsbt = JSBT.encode(users);
        expectAsBinaryString(jsbt).toBe(
            // root obj, ref 0
            '01110001 00000101 ' +
            // "userA", ref 1
            '00010001 00000101 01110101 01110011 01100101 01110010 01000001 ' +
            // user1 instance of User, ref 2
            '01111001 00000010 ' +
            // "User", ref 3
            '00010001 00000100 01010101 01110011 01100101 01110010 ' +
            // "name", ref 4
            '00010001 00000100 01101110 01100001 01101101 01100101 ' +
            // "Alex", ref 5
            '00010001 00000100 01000001 01101100 01100101 01111000 ' +
            // "email", ref 6
            '00010001 00000101 01100101 01101101 01100001 01101001 01101100 ' +
            // alex@test.com, ref 7
            '00010001 00001101 01100001 01101100 01100101 01111000 01000000 01110100 01100101 01110011 01110100 00101110 01100011 01101111 01101101 ' +
            // key userB, ref 8
            '00010001 00000101 01110101 01110011 01100101 01110010 01000010 ' +
            // obj user 1, FROM REF ID 2
            '10110001 00000010 ' +
            // key userC, ref 9
            '00010001 00000101 01110101 01110011 01100101 01110010 01000011 ' +
            // obj user 1, FROM REF ID 2
            '10110001 00000010 ' +
            // key userD, ref 10
            '00010001 00000101 01110101 01110011 01100101 01110010 01000100 ' +
            // user2 instance of User, ref 11
            '01111001 00000010 ' +
            // "User", FROM REF ID 3
            '10110001 00000011 ' +
            // "name" FROM REF 4
            '10110001 00000100 ' +
            // "Test", ref 12
            '00010001 00000100 01010100 01100101 01110011 01110100 ' +
            // email FROM REF 6
            '10110001 00000110 ' +
            // "test@test.com", ref 13
            '00010001 00001101 01110100 01100101 01110011 01110100 01000000 01110100 01100101 01110011 01110100 00101110 01100011 01101111 01101101 ' +
            // "userE", ref 14
            '00010001 00000101 01110101 01110011 01100101 01110010 01000101 ' +
            // obj user 2, FROM REF ID 11
            '10110001 00001011'
        );
    });

    it('should encode and decode the object correct', () => {
        const jsbt = JSBT.encode(users);
        const res = JSBT.decode(jsbt);

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
