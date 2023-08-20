// 1. String
// 2. Number
// 3. BigInt
// 4. Boolean
// 5. Undefined
// 6. Null
// 7. Symbol
// 8. Object
// 9. NaN
// 10. Array
// 11. Map
// 12. Set
// 13. Combined strings

# Specification JSBT
JavaScript Byte Translation

## Structure
1-st byte define value.
- 4 bits is for value type
- 4 bits is for value sub-type or byte length

|   1-st byte      ||
|--------|----------|
| type   | sub-type |
| `0000` | `0000`   |

## 2. Predefined Constants
type: `0000` <br>
sub-type: defined constant
 - `0000` - bolean `FALSE`
 - `0001` - bolean `TRUE`
 - `0002` - `NULL`
 - `0003` - `Undefined`
 - `0004` - `NaN`
 - `0005` - `+Infinity`
 - `0006` - `-Infinity`
 - `0007` - `Math.PI`


## 3. String
type: `0001` <br>
sub-type 4 bits:
+ 1 bit for encoding scheme:
    - `0` - 1 byte for 1 char
    - `1` - 2 bytes for 1 char
+ 3 bits for amount length bytes:
    - `000` - empty string.
    - `001` - 1 byte for length (from 1 to 255 bytes length string).
    - `010` - 2 bytes for length (from 256 to 65,535 bytes)
    - `011` - 3 bytes for length (from 65536 to 1,677,7215 bytes)
    - ...
    - `111` - 7 bytes for length (up to 65,536 terabytes length string)

Examples:
| string  | type   | sub-type | length / bytes | excoding bytes |
|---------|--------|----------|----------------|----------------|
|\<empty> | `0001` | `0000`   |                |                |
|"`Alex`" | `0001` | `0001`   | 4 / `00000100` | `01000001 01101100 01100101 01111000`|
|"`🇬🇧`"   | `0001` | `1001`   | 8 / `00001000` | `11011000 00111100 11011101 11101100 11011000 00111100 11011101 11100111`|



length
:
2
[[Prototype]]
:
Array(0)
