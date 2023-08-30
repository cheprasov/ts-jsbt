# Specification JSBT
JavaScript Byte Translation


## Structure
1-st byte describe value:
- 4 bits is for value type
- 4 bits is for service

|   1-st byte       ||
|---------|----------|
| type    | sub-type |
| `0000`  | `0000`   |


## Suported Types

`0000` - Predefined Constants  
`0001` - Strings  
`0010` - Integers  
`0011` - Floats  
`0100` - BigInts  
`0101` - Arrays  
`0110` - Typed Arrays  
`0111` - Objects  
`? 1000` - Sets  
`? 1001` - Maps  
`? 1010` - Symbols  
`? 1011` - ?
`? 1100` - Refs  
`? 1101` - ?  
`1110` - Additional types  
`1111` - Instructions  


## 0. Predefined Constants `[0000]`
type: `0000` <br>
sub-type: defined constant
 - `0000` - bolean `FALSE`
 - `0001` - bolean `TRUE`
 - `0010` - `NULL`
 - `0011` - `Undefined`

| constant         | type   | sub-type |
|------------------|--------|----------|
| bolean `FALSE`   | `0000` | `0000`   |
| bolean `TRUE`    | `0000` | `0001`   |
| `NULL`           | `0000` | `0010`   |
| `Undefined`      | `0000` | `0011`   |


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

__Note:__
- UTF-16 scheme

__Examples:__
| string  | type   | sub-type | length / bytes    | encoding bytes |
|---------|--------|----------|-------------------|----------------|
|\<empty> | `0001` | `0000`   |                   |                |
|"`Alex`" | `0001` | `0001`   | 4 <br> `00000100` | `01000001` `01101100` `01100101` `01111000`|
|"`🇬🇧`"   | `0001` | `0001`   | 8 <br> `00001000` | `11011000.00111100` `11011101.11101100` `11011000.00111100` `11011101.11100111`|
|"`I💖JS`"| `0001` | `0001`   | 7 <br> `00000111` | `01001001` `11011000.00111101` `11011100.10010110` `01001010` `01010011`|


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

__Note:__
- It is Big-Endian byte ordering (`0x12345678` => `12` `34` `56` `78`)
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
| 1,234,567,890     | `0010` | `0`  | `100`        | `01001001` `10010110` `00000010` `11010010` |
| 9007199254740990  | `0010` | `0`  | `111`        | `00011111` `11111111` `11111111` `11111111` `11111111` `11111111` `11111110` |
| 9007199254740991  | `0010` | `0`  | `111`        | `00011111` `11111111` `11111111` `11111111` `11111111` `11111111` `11111111` |
| -9007199254740991 | `0010` | `1`  | `111`        | `00011111` `11111111` `11111111` `11111111` `11111111` `11111111` `11111111` |


## 3. Floats `[0011]`
type: `0011` <br>
sub-type 4 bits:
+ 1 bit for byte ordering:
    - `0` - Little-Endian (`0x12345678` => `78` `56` `34` `12`)
    - `1` - Big-Endian (`0x12345678` => `12` `34` `56` `78`)
+ 3 bits for amount of encoding bytes + 1:
    - `000` - 1 byte
    - `001` - 2 bytes
    - `010` - 3 bytes
    - `011` - 4 bytes
    - ...
    - `111` - 8 bytes

__Note:__
- There are no `Float(0.0)`, it should be encoded like `Integer(0)`. In JS `0 === 0.0`
- Max possible value is `1.7976931348623157e+308` (Number.MAX_VALUE)
- Min possible value is `5e-324` (Number.MIN_VALUE)

Double-precision floating-point format: https://en.wikipedia.org/wiki/Double-precision_floating-point_format

__Examples:__
| value              | type   | ordering | bytes amount | encoding bytes |
|------------------  |--------|----------|--------------|----------------|
| 1.0000000000000002 | `0011` | `1`      | `111`        | `00111111` `11110000` `00000000` `00000000` `00000000` `00000000` `00000000` `00000001` |
|-1.0000000000000002 | `0011` | `1`      | `111`        | `10111111` `11110000` `00000000` `00000000` `00000000` `00000000` `00000000` `00000001` |
| 156.25             | `0011` | `1`      | `010`        | `01000000` `01100011` `10001000` |
|-156.25             | `0011` | `1`      | `010`        | `11000000` `01100011` `10001000` |
| 3.141592653589793  | `0011` | `1`      | `111`        | `01000000` `00001001` `00100001` `11111011` `01010100` `01000100` `00101101` `00011000` |
| +Infinity          | `0011` | `1`      | `001`        | `01111111` `11110000` |
| -Infinity          | `0011` | `1`      | `001`        | `11111111` `11110000` |
| NaN                | `0011` | `1`      | `001`        | `11111111` `11111000` |
| 17.75              | `0011` | `1`      | `010`        | `01000000` `00110001` `11000000` |
| 5e-324             | `0011` | `0`      | `000`        | `00000001` |


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
- It is Big-Endian byte ordering (`0x12345678` => `12 34 56 78`)

__Examples:__
| BigInt                | type   | sing | length | length / bytes    | encoding bytes |
|-----------------------|--------|------|--------|-------------------|----------------|
| `0n`                  | `0100` | `0`  | `000`  |                   |                |
| `1n`                  | `0100` | `0`  | `001`  | `00000001`        | `00000001`     |
|`-1n`                  | `0100` | `1`  | `001`  | `00000001`        | `00000001`     |
| `257n`                | `0100` | `0`  | `001`  | `00000010`        | `10000000` `00000001` |
|`-257n`                | `0100` | `1`  | `001`  | `00000010`        | `10000000` `00000001` |
|`12345678901234567890n`| `0100` | `0`  | `001`  | `00000100`        | `10101011` `01010100` `10101001` `10001100` `11101011` `00011111` `00001010` `11010010` |


## 5. Arrays `[0101]`
type: `0101` <br>
sub-type 4 bits:
+ 1 bit for sparse array type:
    - `0` - dense array
    - `1` - sparse array (has empty elements)
+ 3 bits for amount bytes for array length:
    - `000` - empty string.
    - `001` - 1 byte for length (from 1 to 255 items).
    - `010` - 2 bytes for length (from 256 to 65,535 items)
    - `011` - 3 bytes for length (from 65536 to 1,677,7215 items)
    - ...
    - `111` - 7 bytes for length (up to 256<sup>7</sup> items length)

__Note:__
- Array can include any supported types (arrays, objects, numbers and so on)
- Max count of items is 256<sup>7</sup>

__Sparse arrays:__
- Sparse Arrays use twice more bytes at 'array length' field.
  + first half bytes for array length
  + following half bytes for count of not empty items
- Not empty values of sparse arrays should be encoded with item index bofore a value
- Empty values are skipped from encoding

__Examples:__
| array                    | type   | sparse | bytes length | array length   | encoding bytes |
|--------------------------|--------|--------|--------------|----------------| ---------------|
| empty []                 | `0101` | `0`    | `000`        |                |                |
| [1, 2, 3]                | `0101` | `0`    | `001`        | `00000011`     | `<Integer 1>` `<Integer 2>` `<Integer 3>` |
| [4]                      | `0101` | `0`    | `001`        | `00000001`     | `<Integer 4>` |
| [5, 6]                   | `0101` | `0`    | `001`        | `00000010`     | `<Integer 5> <Integer 6>` |
| ['Alex', 42, 3.14, true] | `0101` | `0`    | `001`        | `00000100`     | `<String Alex>` `<Integer 42>` `<Float 3.14>` `<Boolean TRUE>` |
| [[1, 2, 3], [4], [5, 6]] | `0101` | `0`    | `001`        | `00000011`     | `<Array [1, 2, 3]>` `<Array [4]>` `<Array [5, 6]>` |
| [12, , 32, 42]           | `0101` | `1`    | `001` (x2)   | `00000100` `00000011` | `<Integer 0>` `<Integer 12>` `<Integer 2>` `<Integer 32>` `<Integer 3>` `<Integer 42>` |
| [ , , , , , 100]         | `0101` | `1`    | `001` (x2)   | `00000110` `00000001` | `<Integer 5>` `<Integer 100>` |


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
  - 1 bit for various size:
    + `0` - each value uses same amount of bytes
    + `1` - each value uses various size of bytes (encoded like a separate type)
  - 1 bit for sparse array type:
    + `0` - dense array
    + `1` - sparse array (has empty elements)
  - 3 bits for length bytes
    + it should be `000` for dense array. (Length will be calculated by items count)
  - 3 bits for items count

__Note:__
- It is Little-Endian byte ordering (`0x78563412` => `12` `34` `56` `78`)

__Sparse arrays:__
- Not empty values of sparse arrays should be encoded with item index bofore a value
- Empty values are skipped from encoding

__Examples:__
| typed array                    | type   | typed  | various | sparse | length | items | length bytes | count bytes | encoding bytes |
|--------------------------------|--------|------- |---------|--------|--------|-------| -------------|-------------|----------------|
| empty `Int8Array([])`          | `0110` | `0001` | `0`     | `0`    | `000`  | `000` |              |             |
| empty `Uint32Array([])`        | `0110` | `0111` | `0`     | `0`    | `000`  | `000` |              |             |
| `Int8Array([-1, 2, 3])`        | `0110` | `0001` | `0`     | `0`    | `000`  | `001` |              | `00000011`  | `11111111` `00000010` `00000011` |
| `Int16Array([258, 1, -3])`     | `0110` | `0100` | `0`     | `0`    | `000`  | `001` |              | `00000011`  | `00000010` `00000001` `00000001` `00000000` `11111101` `11111111` |
| `Int32Array([258, 1, -3])`     | `0110` | `0100` | `1`     | `0`    | `000`  | `001` |              | `00000011`  | `<Integer 258>` `<Integer 1>` `<Integer -3>` |
| `Int16Array([258, , -3])`      | `0110` | `0100` | `0`     | `1`    | `001`  | `001` | `00000011`   | `00000010`  | `<Integer 0>` `00000010` `00000001` `<Integer 2>` `00000010` `00000001` |
| `Int16Array([258, , -3])`      | `0110` | `0100` | `1`     | `1`    | `001`  | `001` | `00000011`   | `00000010`  | `<Integer 0>` `<Integer 258>` `<Integer 2>` `<Integer -3>` |


## 7. Objects `[0111]`
type: `0111` <br>
sub-type 4 bits:
+ 1 bit reserved:
    - `0`
+ 3 bits for properties amount of bytes:
    - `000` - empty object.
    - `001` - 1 byte (from 1 to 255 properties).
    - `010` - 2 bytes (from 256 to 65,535 properties)
    - `011` - 3 bytes (from 65536 to 1,677,7215 properties)
    - ...
    - `111` - 7 bytes for length (up to 256<sup>7</sup> items length)

__Note:__

__Examples:__
