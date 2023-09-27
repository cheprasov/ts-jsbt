import { JSBT } from './JSBT';

const users: any = {
    Alex: {
        name: 'Alex',
        age: 38,
        country: 'UK',
        children: null
    },
    Irina: {
        name: 'Irina',
        age: 40,
        country: 'UK',
        children: null,
    },
    Matvey: {
        name: 'Matvey',
        age: 2,
        parents: null,
    },
};

users.Alex.childred = users.Irina.childred = [users.Matvey];

users.Matvey.parents = [users.Alex, users.Irina];

// Encode
const encodedUsers = JSBT.encode(users);

// Decode
const decodedUsers = JSBT.decode(encodedUsers);

console.log(decodedUsers)

console.log(decodedUsers.Alex.childred === decodedUsers.Irina.childred);
console.log(decodedUsers.Matvey.parents[0] === decodedUsers.Alex);
console.log(decodedUsers.Matvey.parents[1] === decodedUsers.Irina);
