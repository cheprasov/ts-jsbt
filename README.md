[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

@cheprasov/jsbt (v1.0.0)
=========

JSBT is a library for serializing structured JavaScript data. The library is JavaScript oriented and tries to resolve JS needs for better data serialization. 

### Features:
- Super easy to use (serialization works straight away without using any predefined schemas or structure descriptions).
- Supports main JS types: booleans, numbers (as integers or float), bigints, arrays, typed arrays, objects, sets, maps, symbols, dates.
- Created for communication between services written at JavaScript / TypeScript. (Node <-> Browser, Node <-> Node, Browser <-> Browser and so on).
- Optimized for performance and compact.
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
console.log(decodedUsers.Alex.children === decodedUsers.Irina.children);
console.log(decodedUsers.Matvey.parents[0] === decodedUsers.Alex);
console.log(decodedUsers.Matvey.parents[1] === decodedUsers.Irina);
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

## Something does not work

Feel free to fork project, fix bugs, write tests and finally request for pull
