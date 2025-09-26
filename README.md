[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

@cheprasov/jsbt (v1.3.0)
=========

JSBT is a library for serializing structured JavaScript data. The library is JavaScript oriented and tries to resolve JS needs for better data serialization. 

### Features:
- Super easy to use (serialization works straight away without using any predefined schemas or structure descriptions).
- Supports main JS types: booleans, numbers (as integers or float), bigints, arrays, typed arrays, objects, sets, maps, symbols, dates.
- Allows to encode and decode class instances.
- Allows to encode and decode Object Wrappers for primitive values.
- Created for communication between services written at JavaScript / TypeScript. (Node <-> Browser, Node <-> Node, Browser <-> Browser and so on).
- Optimized for performance and compact size.
- Size optimisation for repeated key or values.
- Supports circular data dependencies.
- Supports serialization for linked objects.
- Supports Streams:
    + Supports stream data decoding.
    + Possible to parse message before all data is received.
    + Allows to send several data structures via one stream message.
- It is much powerful than JSON and could replace JSON for communication between microservices.
- Written on TypeScript and supports types.
- Could be implemented by other languages.
- The small library does not have dependencies.

### 0. Specification

See [specification](./specification.md)

### 1. How to install

```bash
> npm install @cheprasov/jsbt
```

```javascript
import { JSBT } from '@cheprasov/jsbt';
```

### 2. Examples

#### 2.1 Encoding and decoding simple data

```javascript
import { JSBT } from '@cheprasov/jsbt';

const user = {
    name: 'Alex',
    age: 38,
    country: 'UK',
    birthday: new Date('1984-10-10')
};

// Encode
const encodedUser = JSBT.encode(user);

// Decode
const decodedUser = JSBT.decode(encodedUser);

// Yes, it supports Date serialisation
console.log(decodedUser.birthday instanceof Date); // true
```

#### 2.2 Encoding and decoding data with link refs

```javascript
import { JSBT } from '@cheprasov/jsbt';
const users = {
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
console.log(decodedUsers.Alex.children === decodedUsers.Irina.children); // true
console.log(decodedUsers.Matvey.parents[0] === decodedUsers.Alex); // true
console.log(decodedUsers.Matvey.parents[1] === decodedUsers.Irina); // true
```

#### 2.3 Encoding instances of Class and decoding as object

For getting props for Encoding Class Instances it will be used first found of the following methods:
- `toJSBT()`
- `toJSON()`
- `valueOf()`

Instance will be encoded like a object simple with props.
Also the decoded object would have configurable, not enumerable and not writable prop `__jsbtConstructorName` with construcor name of encoded instance. 

```javascript
import { JSBT } from '@cheprasov/jsbt';

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
```

#### 2.4 Encoding and decoding instances of Class

For getting props for Encoding Class Instances it will be used first found of the following methods:
- `toJSBT()`
- `toJSON()`
- `valueOf()`

Instance will be encoded like a object simple with props.
Also the decoded object would have configurable, not enumerable and not writable prop `__jsbtConstructorName` with construcor name of encoded instance. 

```javascript
import { JSBT } from '@cheprasov/jsbt';


export class User {

    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }
}

export class CustomUser {

    protected name: string;
    protected email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    toJSBT() {
        // CustomUser will encoded like instance of User class
        return Object.defineProperty(
            {
                _name: this.name,
                _email: this.name,
            },
            '__jsbtConstructorName',
            {
                value: 'User',
                configurable: true,
                enumerable: false,
                writable: false,
            }
        );
    }

}

export class TransformerUser {

    protected name: string;
    protected email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    toJSBT() {
        return (
            {
                _name: this.name,
                _email: this.name,
            },
        );
    }

}


const user = new User('Alex', 'alex@test.com');
const customUser = new User('Custom Alex', 'custom_alex@test.com');
const transformerUser = new TransformerUser('T Alex', 't_alex@test.com');

// Encode
const encodedUser = JSBT.encode(user);
const encodedCustomUser = JSBT.encode(customUser);
const encodedTransformerUser = JSBT.encode(transformerUser);

// Class Factories

JSBT.setClassFactories({
    User: User, // encoded instances of User class will be decoded like instances of User class
    'TransformerUser': User, // encoded instances of TransformerUser will be decoded like instances of User class
});

// Decode
const decodedUser = JSBT.decode(user);
const decodedCustomUser = JSBT.decode(customUser);
const decodedTransformerUser = JSBT.decode(transformerUser);

console.log(decodedUser instanceof User); // true
console.log(decodedCustomUser instanceof User); // true
console.log(decodedTransformerUser instanceof User); // true
```

### 3. How to use

#### 3.1 Encoding data

```javascript
import { JSBT } from '@cheprasov/jsbt';

const userData = {
    name: 'Alex',
    age: 38, 
    country: 'UK'
};

// Encode user data
const jsbt = JSBT.encode(userData);
```

#### 3.2 Decoding data

```javascript
import { JSBT } from '@cheprasov/jsbt';

const userData = {
    name: 'Alex',
    age: 38, 
    country: 'UK'
};

// Encode user data
const jsbt = JSBT.encode(userData); 

// Decode user data
const decodedUser = JSBT.decode(jsbt); 
```

#### 3.3 Decoding stream data

```javascript
import { JSBT } from '@cheprasov/jsbt';

const stream = new ByteStream();

// on loading add portions of message via stream.addMessages()

const loader = new DataLoader(); // Pseudo loader

// Add loaded data portion to stream
loader.onLoadPortionData((data: string) => {
    stream.addMessages(data);
});

// Add last data portion to stream and mark as received all data
loader.onCompleteLoading((data: string) => {
    stream.completeStream(data);
});

// Decode data via stream
const data = JSBT.decodeStream(stream); // returns Promise and it will be resolved on receiving enough bytes for decoding data structure

```

#### 3.4 Decoding instances of Class

```javascript
import { JSBT } from '@cheprasov/jsbt';


export class User {

    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }
}

export class CustomUser {

    protected name: string;
    protected email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

}

const user = new User('Alex', 'alex@test.com');
const customUser = new User('Custom Alex', 'custom_alex@test.com');

// Encode
const encodedUser = JSBT.encode(user);
const encodedCustomUser = JSBT.encode(customUser);

// Class Factories

JSBT.setClassFactories({
    User: User, // encoded instances of User class will be decoded like instances of User class
    CustomUser: CustomUser, // encoded instances of CustomUser class will be decoded like instances of CustomUser class
});

// Decode
const decodedUser = JSBT.decode(user);
const decodedCustomUser = JSBT.decode(customUser);

console.log(decodedUser instanceof User); // true
console.log(decodedCustomUser instanceof CustomUser); // true

```

## Something does not work

Feel free to fork project, fix bugs, write tests and finally request for pull
