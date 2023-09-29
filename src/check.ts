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

users.Alex.children = users.Irina.children = [users.Matvey];

users.Matvey.parents = [users.Alex, users.Irina];

// Encode
const encodedUsers = JSBT.encode(users);
console.log(encodedUsers.length); // 112

// Decode
const decodedUsers = JSBT.decode(encodedUsers);

console.log(decodedUsers)

console.log(decodedUsers.Alex.children === decodedUsers.Irina.children);
console.log(decodedUsers.Matvey.parents[0] === decodedUsers.Alex);
console.log(decodedUsers.Matvey.parents[1] === decodedUsers.Irina);
