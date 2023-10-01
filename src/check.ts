import { JSBT } from './JSBT';

export class User {

    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    toJSBT() { // or toJSON
        return {
            name: this._name,
            email: this._email,
        };
    }

}

const user = new User('Alex', 'alex@test.com');

// Encode
const encodedUser = JSBT.encode(user);

// Decode
const decodedUser = JSBT.decode(encodedUser);

console.log(decodedUser);
// { name: 'Alex', email: 'alex@test.com' }

console.log('Construnctor Name: ', decodedUser.__jsbtConstructorName);
// Construnctor Name: User
