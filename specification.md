# Specification JSBT v1.2.3
JavaScript Byte Translation


## Structure
+ __type byte__ describes value:
  - 4 bits for value type
  - 4 bits for service
+ (optional) __extra type bytes__ with additional params of type
+ (optional) __encoding bytes__ for encoding data

| type byte                    || extra type bytes | encoding bytes |
|-------------|-----------------|------------------|----------------|
| 4 bits type | 4 bits sub-type | 0 or more encoding bytes         ||
| `XXXX`      | `YYYY`          | `<depends on type>`              ||


## Suported Types

`0000` - Predefined Constants  
`0001` - Strings  
`0010` - Integers  
`0011` - Floats  
`0100` - BigInts  
`0101` - Arrays  
`0110` - Typed Arrays  
`0111` - Objects  
`1000` - Sets  
`1001` - Maps  
`1010` - Symbols  
`1011` - Refs  
`1100` - Dates  
`? 1101` - ?  
`? 1110` - ? 
`1111` - Instructions 


## 0. Predefined Constants `[0000]`
type: `0000` <br>
sub-type: defined constant

| constant         | type   | sub-type |
|------------------|--------|----------|
| bolean `FALSE`   | `0000` | `0000`   |
| bolean `TRUE`    | `0000` | `0001`   |
| `NULL`           | `0000` | `0010`   |
| `Undefined`      | `0000` | `0011`   |
| `NaN`            | `0000` | `0100`   |
| `+Infinity`      | `0000` | `0101`   |
| `-Infinity`      | `0000` | `0110`   |
| `Empty Value`    | `0000` | `0111`   |


## 1. Strings `[0001]`
type: `0001` <br>
sub-type 4 bits:
+ 1 bit reserved:
    - `0`
+ 3 bits for amount length bytes:
    - `000` - empty string.
    - `001` - 1 byte for length (from 1 to 255 bytes length string).
    - `010` - 2 bytes for length (from 256 to 65,535 bytes)
    - `011` - 3 bytes for length (from 65536 to 1,677,7215 bytes)
    - ...
    - `111` - 7 bytes for length (up to 65,536 terabytes length string)
+ 1-7 bytes for string length at Little-Endian byte order.

__Note:__
- UTF-8 scheme

__Examples:__
| string        | type   | rsv | length   | length bytes              | encoding bytes |
|---------------|--------|-----|----------|---------------------------|----------------|
|\<empty>       | `0001` | `0` | `000`    |                           |                |
|"`Alex`"       | `0001` | `0` | `001`    | 4 - `00000100`            | `01000001 01101100 01100101 01111000`|
|"`🇬🇧`"         | `0001` | `0` | `001`    | 8 - `00001000`            | `11110000 10011111 10000111 10101100 11110000 10011111 10000111 10100111`|
|"`I💖JS`"      | `0001` | `0` | `001`    | 7 - `00000111`            | `01001001 11110000 10011111 10010010 10010110 01001010 01010011`|
|"`I💖JS`" x 35 | `0001` | `0` | `010`    | 280 - `00011000 00000001` | (`00010001 00000111 01001001 11110000 10011111 10010010 10010110 01001010 01010011 00100000`) x 35|


## 2. Integers `[0010]`
type: `0010` <br>
sub-type 4 bits:
+ 1 bit for the sign:
    - `0` - positive number
    - `1` - negative number
+ 3 bits for amount of encoding bytes:
    - `000` - 0 (zero).
    - `001` - 1 byte length (from 1 to 255).
    - `010` - 2 bytes length (from 256 to 65,535)
    - `011` - 3 bytes length (from 65536 to 1,677,7215)
    - ...
    - `111` - 7 bytes length (up to 256<sup>7</sup> - 1)
+ Encoding number bytes at Little-Endian byte ordering (`0x78563412` => `12 34 56 78`).

__Note:__
- It is Little-Endian byte ordering (`0x78563412` => `12 34 56 78`)
- Max possible number is 9007199254740991 (Number.MAX_SAFE_INTEGER)
- Min possible number is -9007199254740991 (Number.MIN_SAFE_INTEGER)

__Examples:__
| number            | type   | sign | bytes amount | encoding bytes |
|------------------ |--------|------|--------------|----------------|
| 0                 | `0010` | `0`  | `000`        |                |
| -0                | `0010` | `1`  | `000`        |                |
| 1                 | `0010` | `0`  | `001`        | `00000001`     |
| -1                | `0010` | `1`  | `001`        | `00000001`     |
| 42                | `0010` | `0`  | `001`        | `00101010`     |
| 1_234_567_890     | `0010` | `0`  | `100`        | `11010010 00000010 10010110 01001001` |
| 9007199254740990  | `0010` | `0`  | `111`        | `11111110 11111111 11111111 11111111 11111111 11111111 00011111` |
| 9007199254740991  | `0010` | `0`  | `111`        | `11111111 11111111 11111111 11111111 11111111 11111111 00011111` |
| -9007199254740991 | `0010` | `1`  | `111`        | `11111111 11111111 11111111 11111111 11111111 11111111 00011111` |


## 3. Floats `[0011]`
type: `0011` <br>
sub-type 4 bits:
+ 1 bit for byte mapping:
    - `0` - not use byte mapping
    - `1` - use byte mapping
+ 3 bits for amount of encoding bytes + 1:
    - `000` - 1 byte
    - `001` - 2 bytes
    - `010` - 3 bytes
    - `011` - 4 bytes
    - ...
    - `111` - 8 bytes

__Note:__
- It is Little-Endian byte ordering (`0x78563412` => `12 34 56 78`)
- There are no `Float(0.0)`, it should be encoded like `Integer(0)`. In JS `0 === 0.0`
- Max possible value is `1.7976931348623157e+308` (Number.MAX_VALUE)
- Min possible value is `5e-324` (Number.MIN_VALUE)
- Leading zero bytes could be ignored for encoding

Double-precision floating-point format: https://en.wikipedia.org/wiki/Double-precision_floating-point_format

__Examples:__
| value              | type   | mapping | bytes amount | byte map   | encoding bytes |
|------------------  |--------|---------|--------------|------------|----------------|
| 1.0000000000000002 | `0011` | `0`     | `111`        |            | `00000001 00000000 00000000 00000000 00000000 00000000 11110000 00111111` |
| 1.0000000000000002 | `0011` | `1`     | `010`        | `10000011` | `00000001 11110000 00111111` |
|-1.0000000000000002 | `0011` | `0`     | `111`        |            | `00000001 00000000 00000000 00000000 00000000 00000000 11110000 10111111` |
|-1.0000000000000002 | `0011` | `1`     | `010`        | `10000011` | `00000001 11110000 10111111` |
| 156.25             | `0011` | `0`     | `010`        |            | `10001000 01100011 01000000` |
|-156.25             | `0011` | `0`     | `010`        |            | `10001000 01100011 11000000` |
| 3.141592653589793  | `0011` | `0`     | `111`        |            | `00011000 00101101 01000100 01010100 11111011 00100001 00001001 01000000` |
|-3.141592653589793  | `0011` | `0`     | `111`        |            | `00011000 00101101 01000100 01010100 11111011 00100001 00001001 11000000` |
| 17.75              | `0011` | `0`     | `010`        |            | `11000000 00110001 01000000` |
|-17.75              | `0011` | `0`     | `010`        |            | `11000000 00110001 11000000` |
| 5e-324             | `0011` | `0`     | `111`        |            | `00000001 00000000 00000000 00000000 00000000 00000000 00000000 00000000` |
| 5e-324             | `0011` | `1`     | `000`        | `00000001` | `00000001` |
|-5e-324             | `0011` | `1`     | `001`        | `10000001` | `00000001 10000000` |

## 4. BigInt `[0100]`
type: `0100` <br>
sub-type 4 bits:
+ 1 bit for sign:
    - `0` - positive number
    - `1` - negative number
+ 3 bits for amount length bytes:
    - `000` - `0n`.
    - `001` - 1 byte for length (from 1 to 255 bytes length).
    - `010` - 2 bytes for length (from 256 to 65,535 bytes)
    - `011` - 3 bytes for length (from 65536 to 1,677,7215 bytes)
    - ...
    - `111` - 7 bytes for length (up to 65,536 terabytes length)

__Note:__
- It is Little-Endian byte ordering (`0x12345678` => `78 56 34 12`)

__Examples:__
| BigInt                | type   | sing | length | length / bytes    | encoding bytes |
|-----------------------|--------|------|--------|-------------------|----------------|
| `0n`                  | `0100` | `0`  | `000`  |                   |                |
| `1n`                  | `0100` | `0`  | `001`  | `00000001`        | `00000001`     |
|`-1n`                  | `0100` | `1`  | `001`  | `00000001`        | `00000001`     |
| `257n`                | `0100` | `0`  | `001`  | `00000010`        | `00000001 10000000` |
|`-257n`                | `0100` | `1`  | `001`  | `00000010`        | `00000001 10000000` |
|`12345678901234567890n`| `0100` | `0`  | `001`  | `00001000`        | `11010010 00001010 00011111 11101011 10001100 10101001 01010100 10101011` |


## 5. Arrays `[0101]`
type: `0101` <br>
sub-type 4 bits:
+ 1 bit for encoding type:
    - `0` - encode only values
    - `1` - encode keys and values
+ 3 bits for amount bytes for array length:
    - `000` - empty array.
    - `001` - 1 byte for array length (from 1 to 255 items).
    - `010` - 2 bytes for array length (from 256 to 65,535 items)
    - `011` - 3 bytes for array length (from 65536 to 1,677,7215 items)
    - ...
    - `111` - 7 bytes for array length (up to 256<sup>7</sup> - 1 items)

__Note:__
- Array can include any supported types (arrays, objects, numbers and so on)
- Max count of items is 256<sup>7</sup> - 1

__Only Values Encoding:__
- It should be used `Empty Value` for encoding not filled items in the array

__Keys & Value Encoding:__
- It takes twice more bytes at 'array length' field.
  + first half bytes for array length.
  + following half bytes for count of not empty items.
- Not empty values of array should be encoded with item's index before a value.
- Empty values are skipped from encoding.

__Examples:__
| array                    | type   | enc type | bytes length | array length   | encoding bytes |
|--------------------------|--------|----------|--------------|----------------| ---------------|
| empty []                 | `0101` | `0`      | `000`        |                |                |
| [1, 2, 3]                | `0101` | `0`      | `001`        | `00000011`     | `<Integer 1>` `<Integer 2>` `<Integer 3>` |
| [4]                      | `0101` | `0`      | `001`        | `00000001`     | `<Integer 4>` |
| [5, 6]                   | `0101` | `0`      | `001`        | `00000010`     | `<Integer 5> <Integer 6>` |
| ['Alex', 42, 3.14, true] | `0101` | `0`      | `001`        | `00000100`     | `<String Alex>` `<Integer 42>` `<Float 3.14>` `<Boolean TRUE>` |
| [[1, 2, 3], [4], [5, 6]] | `0101` | `0`      | `001`        | `00000011`     | `<Array [1, 2, 3]>` `<Array [4]>` `<Array [5, 6]>` |
| [12, , 32, 42]           | `0101` | `1`      | `001` (x2)   | `00000100` `00000011` | `<Integer 0>` `<Integer 12>` `<Integer 2>` `<Integer 32>` `<Integer 3>` `<Integer 42>` |
| [12, , 32, 42]           | `0101` | `0`      | `001`        | `00000100`     | `<Integer 12>` `<Empty Value>` `<Integer 32>` `<Integer 42>` |
| [ , , , , , 100]         | `0101` | `1`      | `001` (x2)   | `00000110` `00000001` | `<Integer 5>` `<Integer 100>` |


## 6. Typed Arrays `[0110]`
type: `0110` <br>
sub-type 4 bits:
+ 4 bits for TypedArray type:
  - `0000` - `ArrayBuffer`
  - `0001` - `Int8Array` (8-bit signed integer, -128 to 127)
  - `0010` - `Uint8Array` (8-bit unsigned integer, 0 to 255)
  - `0011` - `Uint8ClampedArray` (8-bit unsigned integer (clamped), 0 to 255)
  - `0100` - `Int16Array` (16-bit two's complement signed integer, -32768 to 32767)
  - `0101` - `Uint16Array` (16-bit unsigned integer, 0 to 65535)
  - `0110` - `Int32Array` (32-bit two's complement signed integer, -2147483648 to 2147483647)
  - `0111` - `Uint32Array` (32-bit unsigned integer, 0 to 4294967295)
  - `1000` - `Float32Array` (32-bit IEEE floating point number, -3.4E38 to 3.4E38 and 1.2E-38 is the min positive number)
  - `1001` - `Float64Array` (64-bit IEEE floating point number, -1.8E308 to 1.8E308 and 5E-324 is the min positive number)
  - `1010` - `BigInt64Array` (64-bit two's complement signed integer, -2<sup>63</sup> to 2<sup>63</sup> - 1)
  - `1011` - `BigUint64Array` (64-bit unsigned integer, 0 to 2<sup>64</sup> - 1)

Additional 1 byte for parameters:
  - 1 bit reserved as 0
  - 1 bit for encoding type:
    + `0` - encode only values
    + `1` - encode keys and values
  - 3 bits for bytes length 
    + it should be `000` for only values encoding. (Length will be calculated by items count)
  - 3 bits for items count

__Note:__
- It is Little-Endian byte ordering (`0x78563412` => `12` `34` `56` `78`)
- Empty Values should be encoded like value 0

__encode keys and values:__
- Not empty values of sparse arrays should be encoded with item index before a value
- Empty values are skipped from encoding

__Examples:__
| typed array                         | type   | typed  | rsv | encode  | length | items | length bytes | count items | encoding bytes |
|-------------------------------------|--------|------- |-----|---------|--------|-------| -------------|-------------|----------------|
| empty `Int8Array([])`               | `0110` | `0001` | `0` | `0`     | `000`  | `000` |              |             |                |
| empty `Uint32Array([])`             | `0110` | `0111` | `0` | `0`     | `000`  | `000` |              |             |                |
| `Int8Array([-1, 2, 3])`             | `0110` | `0001` | `0` | `0`     | `000`  | `001` |              | `00000011`  | `11111111 00000010 00000011` |
| `Int16Array([258, 1, -3])`          | `0110` | `0100` | `0` | `0`     | `000`  | `001` |              | `00000011`  | `00000010 00000001 00000001 00000000 11111101 11111111` |
| `Int16Array([0, 258, 0, 0, 0, -3])` | `0110` | `0100` | `0` | `1`     | `001`  | `001` | `00001100`   | `00000010`  | `<Integer 1> 00000010 00000001 <Integer 5> 11111101 11111111` |


## 7. Objects `[0111]`
type: `0111` <br>
sub-type 4 bits:
+ 1 bit encoding class instance:
    - `0` - encoding object
    - `1` - encoding class instance
+ 3 bits for properties amount:
    - `000` - Empty object (without properties).
    - `001` - 1 byte for 1 to 255 properties.
    - `010` - 2 bytes for 256 to 65,535 properties.
    - `011` - 3 bytes for 65536 to 1,677,7215 properties.
    - ...
    - `111` - 7 bytes for up to 256<sup>7</sup> - 1 properties.
+ 1-7 bytes for encoding properies count
+ Encoded <String ConstructorName> for class instances
+ Encoding bytes:
  - each property should be encoded like key & value.
  - allowed types for Object keys are `String`, `Integer`, `Symbol`.
  - any supported type is allowed for Object values.

__Note:__
- Remember, JS convertes `Integer`, `Float`, `BigInt` types to `String` for object key.
- All Symbols will be converted via `Symbol.for(...)`.

__Class Instance Note:__
- After length bytes (and before props) should be encoded constructor name as String value;
- For getting props for Encoding Class Instances it will be used first of the following methods:
    + `toJSBT()`
    + `toJSON()`
    + `valueOf()`

__Examples:__

| object                         | type   | class | length | length bytes | encoding bytes |
|--------------------------------|--------|-------|--------|--------------|----------------|
| empty `{}`                     | `0111` | `0`   | `000`  |              |                |
| `{ a: 1, b: 2, c: 3 }`         | `0111` | `0`   | `001`  | `00000011`   | `<String "a">` `<Integer 1>` `<String "b">` `<Integer 2>` `<String "c">` `<Integer 3>` |
| `{ 42: 'foo' }`                | `0111` | `0`   | `001`  | `00000001`   | `<String "42" or Integer 42>` `<String "foo">` |
| `{ [Symbol.for('foo')]: 42 }`  | `0111` | `0`   | `001`  | `00000001`   | `<Symbol.for('foo')>` `<Integer 42>` |
| `{ [Symbol.for('foo')]: 42 }`  | `0111` | `0`   | `001`  | `00000001`   | `<Symbol.for('foo')>` `<Integer 42>` |
| `new User('Alex', 'alex@t.t')` | `0111` | `1`   | `001`  | `00000001`   | `<String "User">` `<String "name"> <String "Alex">` `<String "email"> <String "alex@t.t">` |


## 8. Sets `[1000]`
type: `1000` <br>
sub-type 4 bits:
+ 1 bit reserved:
    - `0` - reserved bit
+ 3 bits for amount bytes for set size:
    - `000` - empty set.
    - `001` - 1 byte for set size (from 1 to 255 items).
    - `010` - 2 bytes for set size (from 256 to 65,535 items)
    - `011` - 3 bytes for set size (from 65536 to 1,677,7215 items)
    - ...
    - `111` - 7 bytes for set size (up to 256<sup>7</sup> - 1 items)
+ 1-7 bytes for properies count
+ Encoding bytes

__Note:__
- Set can include any supported types (arrays, objects, numbers and so on)
- Max allowed Set size is 256<sup>7</sup> - 1
- Encodes same items order
- Duplicated items are not allowed

__Examples:__
| set                                    | type   | rsv | bytes length | array length | encoding bytes |
|----------------------------------------|--------|-----|--------------|--------------| ---------------|
| new Set()                              | `1000` | `0` | `000`        |              |                |
| new Set([1, 2, 3])                     | `1000` | `0` | `001`        | `00000011`   | `<Integer 1>` `<Integer 2>` `<Integer 3>` |
| new Set([ new Set([1, 2, 3]), {a:1} ]) | `1000` | `0` | `001`        | `00000010`   | `<Set [1,2,3]>` `<Object {a:1}>` |


## 9. Maps `[1001]`
type: `1001` <br>
sub-type 4 bits:
+ 1 bit reserved:
    - `0`
+ 3 bits for properties amount of bytes:
    - `000` - Empty Map.
    - `001` - 1 byte for map size (from 1 to 255 items).
    - `010` - 2 bytes for map size (from 256 to 65,535 items)
    - `011` - 3 bytes for map size (from 65536 to 1,677,7215 items)
    - ...
    - `111` - 7 bytes for map size (up to 256<sup>7</sup> - 1 items length)
+ 1-7 bytes for map size
+ Encoding bytes:
  - each item should be encoded like key & value.
  - all types are allowed for key or value
  - encodes same items order

__Examples:__

| map                              | type   | res | length | length bytes | encoding bytes |
|----------------------------------|--------|-----|--------|--------------|----------------|
| new Map()                        | `1001` | `0` | `000`  |              |                |
| new Map([['a', 1], ['foo', 42]]) | `1001` | `0` | `001`  | `00000010`   | `<String "a">` `<Integer 1>` `<String "foo">` `<Integer 42>` |


## 10. Symbols `[1010]`
type: `1010` <br>
sub-type 4 bits:
+ 1 bit reserved:
    - `0`
+ 3 bits for amount length bytes:
    - `000` - empty symbol key ('').
    - `001` - 1 byte for length (from 1 to 255 bytes length string).
    - `010` - 2 bytes for length (from 256 to 65,535 bytes)
    - `011` - 3 bytes for length (from 65536 to 1,677,7215 bytes)
    - ...
    - `111` - 7 bytes for length (up to 65,536 terabytes length)

__Note:__
- It should be encode like String, but with type `1010`
- UTF-16 scheme
- All Symbols will be encode like `Symbol.for(...)`

__Examples:__
| symbol               | type   | rsv | length   | length bytes   | encoding bytes |
|----------------------|--------|-----|----------|----------------|----------------|
| `Symbol.for('')`     | `1010` | `0` | `000`    |                |                |
| `Symbol.for('Alex')` | `1010` | `0` | `001`    | 4 - `00000100` | `01000001` `01101100` `01100101` `01111000`|
| `Symbol.for('🇬🇧')`   | `1010` | `0` | `001`    | 8 - `00001000` | `11011000.00111100` `11011101.11101100` `11011000.00111100` `11011101.11100111`|
| `Symbol.for('I💖JS')`| `1010` | `0` | `001`    | 7 - `00000111` | `01001001` `11011000.00111101` `11011100.10010110` `01001010` `01010011`|


## 11. Refs `[1011]`

Ref is a not a separate type, it is a link that allows to use some value several time and encode it only once.  
Also it allows to store different data with keeping references inside encoded data.

Example:
```javascript
const arr = [1, 2, 3];
const obj = { foo: 'bar', arr: arr };

const data = {
    arr1: arr,
    arr2: arr,
    obj1: obj,
    obj2: obj,
};

console.log(data.arr1 === data.arr2); // true
console.log(data.obj1 === data.obj2); // true
console.log(data.obj1.arr === data.obj2.arr); // true
```
If you use `JSON.stringify(data)` and then `JSON.parse(json)` you will get 4 different array and 2 objects like: 
```javascript
const json = JSON.stringify(data);
const data2 = JSON.parse(json);

console.log(data2.arr1 === data2.arr2); // false
console.log(data2.obj1 === data2.obj2); // false
console.log(data2.obj1.arr === data2.obj2.arr); // false
```
__Ref__ solves the problem and after encoding and decoding at JSBT format the refs inside the data will be keeped. 
```javascript
const message = JSBT.encode(data);
const data3 = JSBT.decode(message);

console.log(data3.arr1 === data3.arr2); // true
console.log(data3.obj1 === data3.obj2); // true
console.log(data3.obj1.arr === data3.obj2.arr); // true
```

type: `1011` <br>
sub-type 4 bits:
+ 1 bit for ref mode:
    + `0` - use the same value / object.
    + `1` - use the copy of the value / object.
+ 3 bits for:
    - `000` - using Ref ID 0.  
    - `001` - 1 byte for ref ID from 1 to 255.
    - `010` - 2 bytes for ref ID from  256 to 65,535.
    - `011` - 3 bytes for ref ID from 65536 to 1,677,7215.
    - ...
    - `111` - 7 bytes for ref ID up to 256^<sup>7</sup> - 1 refs

__Note:__
- Each encoded type has unique id and the ref uses it for creating a link or a copy of the value.
- It can not be used as separate type and should be used always like a link to already encoded type.

__Examples:__
```
const obj = {           // refId = 0
    foo:                // refId = 1
        'bar',          // refId = 2
    baz:                // refId = 3
        1_000_000,      // refId = 4
    ar1:                // refId = 5
        [               // refId = 6
            1,          // no refs for small values
            2,      
            3,
            1_000_000,  // link to refId 4
        ],
    ar2:                // refId = 7
        [               // refId = 8
            1,
            2,
            3,
            1_000_000   // link to refId 4
        ],
    ar3:                // refId = 9
        [               // refId = 10
            1,
            2,
            3,
            1_000_000   // link to refId 4
        ],
};
obj.ar4 =               // refId = 11
    obj.ar3;            // link to refId 10
```
| ref                        | ref ID | type   | copy | id lenght |  encoded ref ID |
|----------------------------|--------|--------|------|-----------|-----------------|
| creating ref to `foo`      | 1      | `1011` | `0`  | `001`     | `00000001`      |
| creating ref to `1_000_000`| 4      | `1011` | `0`  | `001`     | `00000100`      |
| creating ref to `ar[...]`  | 5      | `1011` | `1`  | `001`     | `00000101`      |


## 12. Dates `[1100]`
type: `1100` <br>
sub-type 4 bits:
+ 1 bit for the sign:
    - `0` - positive number
    - `1` - negative number
+ 3 bits for amount of encoding bytes:
    - `000` - 0 ms (1970-01-01T00:00:00.000Z).
    - `001` - 1 byte length (from 1 to 255 ms).
    - `010` - 2 bytes length (from 256 to 65,535 ms)
    - `011` - 3 bytes length (from 65536 to 1,677,7215 ms)
    - ...
    - `111` - 7 bytes length (up to 256<sup>7</sup> - 1 ms)
+ Encoding number bytes at Little-Endian byte ordering (`0x78563412` => `12 34 56 78`).

__Note:__
- It is Little-Endian byte ordering (`0x78563412` => `12 34 56 78`)
- Max possible number is 9007199254740991 ms (Number.MAX_SAFE_INTEGER)
- Min possible number is -9007199254740991 ms (Number.MIN_SAFE_INTEGER)

__Examples:__
| date (ms)         | type   | sign | bytes amount | encoding bytes |
|------------------ |--------|------|--------------|----------------|
| 0                 | `1100` | `0`  | `000`        |                |
|                   | `1100` | `1`  | `000`        |                |
| 1                 | `1100` | `0`  | `001`        | `00000001`     |
| -1                | `1100` | `1`  | `001`        | `00000001`     |
| 42                | `1100` | `0`  | `001`        | `00101010`     |
| 1_234_567_890     | `1100` | `0`  | `100`        | `11010010 00000010 10010110 01001001` |
| 9007199254740990  | `1100` | `0`  | `111`        | `11111110 11111111 11111111 11111111 11111111 11111111 00011111` |
| 9007199254740991  | `1100` | `0`  | `111`        | `11111111 11111111 11111111 11111111 11111111 11111111 00011111` |
| -9007199254740991 | `1100` | `1`  | `111`        | `11111111 11111111 11111111 11111111 11111111 11111111 00011111` |

## 13. Instructions `[1111]`
Instructions are special definitions that describes how following structures should be encoded:

type: `1111` <br>
sub-type 4 bits:
+ 4 bits for instructions:
    - `000` - Encode Primitive Types with Object Wrapper.

__Note:__

__Examples:__
| instrution          | type   | instruction | encoding bytes     |
|---------------------|--------|-------------|--------------------|
| new Boolean(true)   | `1111` | `0000`      | `<Constant TRUE>`  |
| new Number(42)      | `1111` | `0000`      | `<Integer 42>`     |
| new Number(3.1415)  | `1111` | `0000`      | `<Float 3.1415>`   |
| new String('Alex')  | `1111` | `0000`      | `<String "Alex">`  |


<style>
thead > tr  {
   border-top-style: solid !important;
}
td, th {
   border-left-style: solid !important;
   border-right-style: solid !important;
}
tr:last-child {
    border-bottom-style: solid !important;
}
</style>
