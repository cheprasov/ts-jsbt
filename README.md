[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# @cheprasov/jsbt

> **JavaScript Binary Transfer** – a binary serialization format designed **for JavaScript → JavaScript communication**.

JSBT is a library and binary format for serializing **real JavaScript object graphs** – not just JSON‑like data.  
It is built around the needs of JS/TS runtimes and can safely serialize:

- Complex graphs with **circular references** and **shared objects**
- **Dates, BigInts, TypedArrays, Maps, Sets, Symbols**
- Class instances (with optional reconstruction of original prototypes)
- Large, repetitive structured data with **aggressive size deduplication**

JSBT is ideal for **Node ↔ Node**, **Node ↔ Browser**, **Browser ↔ Browser**, worker/IPC channels, and any JS‑only distributed system where you care about **structure, types and size**, not just plain JSON.

---

## Table of Contents

1. [Why JSBT?](#why-jsbt)
2. [Features](#features)
3. [Supported Types & Limitations](#supported-types--limitations)
4. [How JSBT Refs Work](#how-jsbt-refs-work)
5. [Benchmarks](#benchmarks)
6. [Installation](#installation)
7. [Quick Start](#quick-start)
8. [Usage Examples](#usage-examples)  
   8.1 [Simple data](#81-encoding-and-decoding-simple-data)  
   8.2 [Linked objects and circular references](#82-encoding-and-decoding-data-with-link-refs)  
   8.3 [Class instances → plain objects](#83-encoding-instances-of-class-and-decoding-as-object)  
   8.4 [Class instances → restored instances](#84-encoding-and-decoding-instances-of-class)  
   8.5 [Streams](#85-decoding-stream-data)
9. [Specification](#specification)
10. [FAQ: When to use JSBT?](#faq-when-to-use-jsbt)
11. [Security considerations](#security-considerations)
12. [Contributing](#contributing)
13. [Playground](#playground)
14. [License](#license)

---

## Why JSBT?

Most popular serialization formats in the JS ecosystem were not designed around JavaScript’s own data model:

- **JSON** cannot represent `undefined`, `NaN`, `Infinity`, `-0`, `Map`, `Set`, `BigInt`, circular references, or shared objects.
- **Protobuf / Avro / Thrift** are **schema‑driven RPC formats**. They are fantastic for cross‑language contracts, but they require predefined schemas, manual mappings and do not understand JS runtime types.
- **MessagePack / CBOR** are great compact formats, but they still operate with a JSON‑like view of the world and don’t natively model complex object graphs.

**JSBT takes a different approach:**

> It is a **binary format designed specifically for JavaScript runtimes**, with first‑class support for the types and patterns that JS developers actually use.

Most serialization formats used with JavaScript were not designed for real JS data:

| Format     | Purpose        | Graph Support | Circular Refs | Class Instances | Repeated Structure Compression |
|------------|----------------|--------------|----------------|------------------|-------------------------------|
| JSON       | Simple text    | ❌ tree only  | ❌ no          | ❌ no            | ❌ no                         |
| Protobuf   | Schema-based   | ❌ schema     | ❌ no          | ❌ limited       | ❌ no                         |
| MsgPack    | Compact JSON   | ❌ tree only  | ❌ no          | ❌ partial       | ❌ no                         |
| CBOR       | Compact JSON   | ❌ tree only  | ❌ no          | ❌ partial       | ❌ no                         |
| **JSBT**   | **JavaScript** | **✔ graph**   | **✔ yes**     | **✔ yes**       | **✔ yes**                     |

JSBT is the only binary format created **for developers who work exclusively inside the JS/TS ecosystem**.

Typical use cases:

- transferring complex data between **Node processes**, **workers**, or **browser tabs**
- storing **snapshots** of in‑memory state (caches, order books, graphs)
- efficient transmission of **large, repetitive financial or analytical data**
- IPC for Electron, WebWorkers, Node worker threads, etc.

Designed for:

- Node ↔ Node data transport  
- Node ↔ Browser real-time applications  
- Worker threads / Web Workers  
- Financial systems / analytics / order books  
- IPC inside Electron  
- Large repetitive data structures  
- Linked graphs & circular references  


If your data is just small JSON objects, JSBT might be overkill.  
If your data is **real JS graphs** with lots of structure and repetition – JSBT is a very strong fit.

---

## Features

- 🧠 **JavaScript‑native format**  
  Supports real JS structures: circular references, shared references, Maps, Sets, Dates, BigInts, TypedArrays, Symbols, class instances, wrapped primitives, etc.

- 🪢 **Graph-safe serialization (unique among JS formats)**  
  Correctly encodes and decodes object graphs, not just trees. Shared references and cycles are preserved.

- 📉 **Efficient for repetitive data**  
  JSBT deduplicates repeated keys and values. Large arrays of similar objects can be compressed **dozens of times** compared to naive JSON or binary formats that do not model repetition.
  Example: **10,000 objects → 62.7 KB** (JSON = 4.46 MB).

- 🧱 **No schemas required**  
  Works directly with your JS objects. No IDL files, no code generation, no extra build steps.

- 🧑‍🏭 **Class instance support**  
  Encode/decode class instances, with configurable factories to restore them to actual class instances, not just plain objects.

- 🧵 **Streaming support**  
  Decode from streams; parse messages before the full payload is received; send multiple messages over a single binary stream.

- 💪 **Enterprise-grade but developer-friendly**  
  Clear API, supports TypeScript, fully documented.

- 🧾 **TypeScript‑first**  
  Implemented in TypeScript with typings out of the box.

- 🧩 **Small and dependency‑free**  
  Just import it and use – no runtime dependencies.

---

## Supported Types & Limitations

JSBT defines a compact internal type system (see [specification](./specification.md)) and currently supports:

### Supported structures

- **Predefined constants**  
  - `undefined`  
  - `null`  
  - `true` / `false`  
  - `NaN`  
  - `Infinity`, `-Infinity`  
  - `-0` (distinguished from `+0`)

- **Strings**  
  - ASCII, Unicode, very long strings

- **Numbers**  
  - Safe integers (`Number.isSafeInteger(value) === true`)  
  - Floating‑point values (including very small/large magnitudes)

- **BigInts**  
  - Arbitrary‑precision integers via `bigint`

- **Arrays**  
  - Plain arrays  
  - Nested arrays

- **Typed Arrays**  
  - `Uint8Array`, `Float64Array`, and other TypedArray varieties (via generic typed array handling)

- **Objects**  
  - Plain objects with arbitrary nested structure

- **Sets**  
  - `Set<T>` with arbitrary serializable values

- **Maps**  
  - `Map<K, V>` with serializable keys and values

- **Symbols**  
  - Symbol values (especially `Symbol.for()` global symbols)

- **Refs**  
  - Shared references (the same object/array appearing in multiple places)  
  - Circular references (self‑links, back‑references)

- **Dates**  
  - `Date` instances with millisecond precision

- **Class Instances**  
  - Instances encoded via `.toJSBT()`, `.toJSON()`, or `.valueOf()`  
  - Optional reconstruction via `JSBT.setClassFactories()`.

### Known limitations

These are intentional design choices and are important to understand:

- ❗ **Unsafe integers cannot be encoded as plain numbers**  
  JSBT will throw for integers outside the range of safe JavaScript integers.  
  Use `bigint` instead:

  ```ts
  // Bad (will throw):
  const value = 2 ** 60; // unsafe integer

  // Good:
  const value = 2n ** 60n; // BigInt, encoded via BigInt support (0100)
  ```

- ❗ **Local symbol keys in objects are not supported**  
  Symbols are supported as **values** (especially global symbols via `Symbol.for()`),  
  but arbitrary *local* symbols as object keys are not encoded.

---

## How JSBT Refs Work

JSBT is a **graph serializer**, not a tree serializer.

Most formats (JSON, MsgPack, Protobuf, CBOR) duplicate repeated structures.  
JSBT assigns **refIds** and reuses values.

### Key abilities:

✔ Shared objects stay shared  
✔ Arrays reused several times encoded once  
✔ Circular references fully supported  
✔ Massive compression for repetitive datasets  
✔ Correct object identity restored after decoding  

### Example: shared references

```js
const arr = [1, 2, 3];
const obj = { foo: "bar", arr };

const data = { arr1: arr, arr2: arr, obj1: obj, obj2: obj };
```

**JSON loses identity:**

```js
const d = JSON.parse(JSON.stringify(data));
d.arr1 === d.arr2           // false
d.obj1 === d.obj2           // false
d.obj1.arr === d.obj2.arr   // false
```

**JSBT preserves identity:**

```js
const d = JSBT.decode(JSBT.encode(data));
d.arr1 === d.arr2           // true
d.obj1 === d.obj2           // true
d.obj1.arr === d.obj2.arr   // true
```

### Why is this important?

| Feature | JSON | Protobuf | MsgPack | CBOR | **JSBT** |
|--------|------|----------|---------|-------|----------|
| Shared references | ❌ | ❌ | ❌ | ❌ | **✔** |
| Circular references | ❌ | ❌ | ❌ | ❌ | **✔** |
| Value deduplication | ❌ | ❌ | ❌ | ❌ | **✔** |
| Structure deduplication | ❌ | ❌ | ❌ | ❌ | **✔** |

This is the reason JSBT can beat JSON/MsgPack/Protobuf **by 50×–70×** on repeated data.

---

## Benchmarks

> Benchmarks are synthetic and indicative, not absolute.  
> They were run on Node.js with several typical scenarios.

### 1. Simple flat object

A moderately sized plain object: numbers, strings, arrays, nested meta.

JSBT is **not** optimized for trivial objects – JSON / Protobuf / MessagePack / CBOR are faster and/or smaller here.

| Library   | Size (bytes) | Encode (µs/op) | Decode (µs/op) |
|-----------|--------------|----------------|----------------|
| JSON      | 1430         | 4.85           | 3.48           |
| Protobuf  | 1017         | 3.29           | 1.95           |
| MsgPack   | 1083         | 2.31           | 1.58           |
| CBOR      | 1090         | 1.33           | 1.56           |
| **JSBT**  | 1398         | 31.51          | 20.83          |

> If your data is just simple JSON objects, stay with JSON or a standard binary format.  
> JSBT is built for more complex structures.

---

### 2. Complex JS graph (Map, Set, Date, TypedArray, circular refs)

A single, rich JS object graph with:

- `Map`, `Set`, `Date`, `TypedArray`
- nested structures
- self‑references and back‑references

Most generic formats either fail or require manual flattening.

| Library   | Result |
|-----------|--------|
| JSON      | ❌ Error: circular structure |
| Protobuf  | ⚠️ Encodes an empty/default message (data lost) |
| MsgPack   | ❌ Error: too deep objects (depth limit) |
| CBOR      | ❌ Error: maximum call stack size exceeded |
| **JSBT**  | ✅ Encodes & decodes full graph, including circular refs and typed data |

Performance (JSBT only, 5,000 iterations):

- Size: **~57.5 KB**
- Encode: **~3,481 µs/op**
- Decode: **~1,586 µs/op**

---

### 3. Repeated data (10,000 similar objects)

**10,000 objects** with highly repetitive structure and values (as often seen in financial, logging, or analytical data):

- many identical keys
- repeated string values
- shared arrays and meta objects

Size comparison (single run):

| Library   | Size (bytes) | Human‑readable |
|-----------|--------------|----------------|
| JSON      | 4,680,335    | 4.46 MB        |
| Protobuf  | 3,108,000    | 2.96 MB        |
| MsgPack   | 3,708,003    | 3.54 MB        |
| CBOR      | 3,775,603    | 3.60 MB        |
| **JSBT**  | **64,175**   | **62.7 KB**    |

```
Size comparison (lower is better)

JSON      ████████████████████████████████████████ 4.46 MB
Protobuf  ████████████████████                     2.96 MB
MsgPack   ███████████████████████                  3.54 MB
CBOR      ████████████████████████                 3.60 MB
JSBT      █                                        0.06 MB
```

JSBT is:  
🔥 **73× smaller than JSON**  
🔥 **48× smaller than Protobuf**  
🔥 **56–60× smaller than MsgPack/CBOR**

- **~48–73× smaller** than the other formats on this dataset.

JSBT deduplicates repeated structures and values and models the data as a graph with references, instead of blindly repeating every field and string.

Performance (JSBT only, 100 iterations):

- One object size: **0.43 kb**
- 10,000 objects size: ≈ **60.5 kb**  
- Encode: **≈ 1,029 ms/op** (synthetic heavy test)  
- Decode: **≈ 43 ms/op**

> For large, repetitive datasets, JSBT can reduce size by **orders of magnitude**  
> compared to formats that do not exploit structural repetition.

---

## Installation

```bash
npm install @cheprasov/jsbt
# or
yarn add @cheprasov/jsbt
# or
pnpm add @cheprasov/jsbt
```

```ts
import { JSBT } from '@cheprasov/jsbt';
```

No runtime dependencies are required.

---

## Quick Start

```ts
import { JSBT } from '@cheprasov/jsbt';

const user = {
  name: 'Alex',
  age: 38,
  country: 'UK',
  birthday: new Date('1984-10-10'),
};

// Encode to binary
const encodedUser = JSBT.encode(user);

// Decode back
const decodedUser = JSBT.decode(encodedUser);

console.log(decodedUser.birthday instanceof Date); // true
```

---

## Usage Examples

### 8.1 Encoding and decoding simple data

```ts
import { JSBT } from '@cheprasov/jsbt';

const user = {
  name: 'Alex',
  age: 38,
  country: 'UK',
  birthday: new Date('1984-10-10'),
};

// Encode
const encodedUser = JSBT.encode(user);

// Decode
const decodedUser = JSBT.decode(encodedUser);

console.log(decodedUser);
// { name: 'Alex', age: 38, country: 'UK', birthday: new Date('1984-10-10T00:00:00.000Z') }

console.log(decodedUser.birthday instanceof Date); // true
```

---

### 8.2 Encoding and decoding data with link refs

```ts
import { JSBT } from '@cheprasov/jsbt';

const users = {
  Alex: {
    name: 'Alex',
    age: 38,
    country: 'UK',
    children: null,
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
console.log(encodedUsers.length); // e.g. 112

// Decode
const decodedUsers = JSBT.decode(encodedUsers);

console.log(decodedUsers.Alex.children === decodedUsers.Irina.children); // true
console.log(decodedUsers.Matvey.parents[0] === decodedUsers.Alex);       // true
console.log(decodedUsers.Matvey.parents[1] === decodedUsers.Irina);      // true
```

This is where JSBT differs from JSON and most binary formats:  
**references and cycles are preserved**, not flattened away.

---

### 8.3 Encoding instances of Class and decoding as object

When encoding class instances, JSBT will use the first available method among:

- `toJSBT()`
- `toJSON()`
- `valueOf()`

The instance will be encoded as a plain object.  
Additionally, the decoded object will have a non‑enumerable property `__jsbtConstructorName` with the original constructor name.

```ts
import { JSBT } from '@cheprasov/jsbt';

export class User {
  protected _name: string;
  protected _email: string;

  constructor(name: string, email: string) {
    this._name = name;
    this._email = email;
  }

  toJSBT() { // or toJSON, or valueOf
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

console.log('Constructor Name:', decodedUser.__jsbtConstructorName);
// Constructor Name: User
```

---

### 8.4 Encoding and decoding instances of Class

You can also configure JSBT to **reconstruct instances** using class factories.

```ts
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
const customUser = new CustomUser('Custom Alex', 'custom_alex@test.com');

// Encode
const encodedUser = JSBT.encode(user);
const encodedCustomUser = JSBT.encode(customUser);

// Register factories
JSBT.setClassFactories({
  User,        // instances of User will be decoded as User
  CustomUser,  // instances of CustomUser will be decoded as CustomUser
});

// Decode
const decodedUser = JSBT.decode(encodedUser);
const decodedCustomUser = JSBT.decode(encodedCustomUser);

console.log(decodedUser instanceof User);         // true
console.log(decodedCustomUser instanceof CustomUser); // true
```

You can also map one encoded constructor name to another class if needed (e.g. migrations, polymorphic hierarchies).

---

### 8.5 Decoding stream data

JSBT can decode data from a stream incrementally, allowing you to:

- Parse messages before all data is received
- Send several JSBT messages over a single stream
- Build efficient protocols over TCP/WebSocket/etc.

> Note: the API below is conceptual/pseudo‑code – adjust to your actual `ByteStream` / loader implementations.

```ts
import { JSBT } from '@cheprasov/jsbt';

const stream = new ByteStream(); // Your own byte stream abstraction

const loader = new DataLoader(); // Pseudo loader

// Feed portions of data into the stream as they arrive
loader.onLoadPortionData((chunk: Uint8Array) => {
  stream.addMessages(chunk);
});

// Mark stream completion
loader.onCompleteLoading((lastChunk: Uint8Array) => {
  stream.completeStream(lastChunk);
});

// Decode data via stream
const dataPromise = JSBT.decodeStream(stream); // Promise resolved once enough bytes are received

dataPromise.then((data) => {
  console.log('Decoded from stream:', data);
});
```

---

## Specification

The full binary specification of JSBT, including type tags and encoding details, is documented here:

👉 [specification.md](./specification.md)

This document is the reference if you want to implement JSBT in another language or integrate it into low‑level protocols.

---

## FAQ: When to use JSBT?

**Use JSBT when:**

- You control both ends and **both sides are JavaScript/TypeScript**.
- You need to transfer complex JS data (Maps, Sets, Dates, BigInts, TypedArrays, circular references).
- You care about **preserving structure and types**, not just raw JSON.
- Your payloads are often **large and repetitive** (financial feeds, logs, metrics, analytical reports).
- You want a compact binary format without maintaining schemas or IDLs.

**Probably don’t use JSBT when:**

- You just need to send small JSON objects over HTTP.
- You require a cross‑language, schema‑first contract (use Protobuf/Avro/Thrift instead).
- Your main bottleneck is CPU on trivial payloads and JSON is “good enough”.


---

## Security considerations

- JSBT does not execute arbitrary code
- No eval-based deserialization
- Class reconstruction is opt-in via factory map
- Unexpected class names produce plain objects

---

## Playground

https://cheprasov.github.io/ts-jsbt-playground/

## Contributing

Something does not work as expected? Found a bug? Want to add a feature?

- Fork the project
- Add or adjust tests
- Fix the issue
- Open a Pull Request

Contributions, issue reports, and benchmark results are all very welcome.

---

## License

MIT – see [LICENSE](./LICENSE) for details.
