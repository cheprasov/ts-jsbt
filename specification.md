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
`0010` - Numbers \
`?` - Floats \
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
 - `0100` - `NaN`
 - `0101` - `+Infinity`
 - `0110` - `-Infinity`

| constant         | type   | sub-type |
|------------------|--------|----------|
| bolean `FALSE`   | `0000` | `0000`   |
| bolean `TRUE`    | `0000` | `0001`   |
| `NULL`           | `0000` | `0010`   |
| `Undefined`      | `0000` | `0011`   |
| `NaN`            | `0000` | `0100`   |
| `+Infinity`      | `0000` | `0101`   |
| `-Infinity`      | `0000` | `0110`   |
|                  | `0000` | `0111`   |

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
|"`Alex`" | `0001` | `0001`   | 4 <br> `00000100` | `01000001`<br>`01101100`<br>`01100101`<br>`01111000`|
|"`🇬🇧`"   | `0001` | `0001`   | 8 <br> `00001000` | `11011000.00111100`<br>`11011101.11101100`<br>`11011000.00111100`<br>`11011101.11100111`|
|"`I💖JS`"| `0001` | `0001`   | 7 <br> `00000111` | `01001001`<br>`11011000.00111101`<br>`11011100.10010110`<br>`01001010`<br>`01010011`|

## 4. Number `[0002]`
type: `0002` <br>
sub-type 4 bits:
+ 1 bit for encoding scheme:
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
- It is Big-Endian byte ordering (0x12345678 => 12 34 56 78)
- Max possible number is 9007199254740991 (Number.MIN_SAFE_INTEGER)
- Min possible number is -9007199254740991 (Number.MIN_SAFE_INTEGER)

__Examples:__
| number            | type   | negative | bytes amount | encoding bytes |
|------------------ |--------|----------|--------------|----------------|
| 0                 | `0002` | `0`      | `000`        |                |
| -0                | `0002` | `1`      | `000`        |                |
| 1                 | `0002` | `0`      | `001`        | `00000001`     |
| -1                | `0002` | `1`      | `001`        | `00000001`     |
| 42                | `0002` | `0`      | `001`        | `00101010`     |
| 1,234,567,890     | `0002` | `0`      | `100`        | `01001001`<br>`10010110`<br>`00000010`<br>`11010010` |
| 9007199254740990  | `0002` | `0`      | `111`        | `00011111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111110` |
| 9007199254740991  | `0002` | `0`      | `111`        | `00011111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111111` |
| -9007199254740991 | `0002` | `1`      | `111`        | `00011111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111111`<br>`11111111` |

