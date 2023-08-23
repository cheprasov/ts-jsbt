# Specification JSBT
JavaScript Byte Translation

## Structure
1-st byte define value.
- 4 bits is for value type
- 4 bits is for value sub-type or byte length

|   1-st byte       ||
|---------|----------|
| type    | sub-type |
| `0000`  | `0000`   |

## 1. Types

`0000` - Predefined Constants \
`0001` - Strings \
`0010` - Integers \
`0011` - Floats \
`?` - BigInts \
`?` - Symbols \
`?` - Objects \
`?` - Arrays \
`?` - Maps \
`?` - Sets \
`?` - Combined strings \
`?` - Refs \
`?` -  \
`1111` - 'Additional types'

## 2. Predefined Constants `[0000]`
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

## 3. Strings `[0001]`
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
| string  | type   | sub-type | length / bytes    | excoding bytes |
|---------|--------|----------|-------------------|----------------|
|\<empty> | `0001` | `0000`   |                   |                |
|"`Alex`" | `0001` | `0001`   | 4 <br> `00000100` | `01000001` `01101100` `01100101` `01111000`|
|"`🇬🇧`"   | `0001` | `0001`   | 8 <br> `00001000` | `11011000.00111100` `11011101.11101100` `11011000.00111100` `11011101.11100111`|
|"`I💖JS`"| `0001` | `0001`   | 7 <br> `00000111` | `01001001` `11011000.00111101` `11011100.10010110` `01001010` `01010011`|

## 4. Integers `[0010]`
type: `0010` <br>
sub-type 4 bits:
+ 1 bit for the sign:
    - `0` - positive number
    - `1` - negative number
+ 3 bits for amount of encoding bytes:
    - `000` - 0 (zero).
    - `001` - 1 byte for length (from 1 to 255 bytes length string).
    - `010` - 2 bytes for length (from 256 to 65,535 bytes)
    - `011` - 3 bytes for length (from 65536 to 1,677,7215 bytes)
    - ...
    - `111` - 7 bytes for length (up to 65,536 terabytes length string)

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

## 4. Floats `[0011]`
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
