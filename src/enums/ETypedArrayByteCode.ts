import { ETypeByteCode } from './ETypeByteCode';

export enum ETypedArrayByteCode {
    ArrayBuffer       = 0b0000_0000 | ETypeByteCode.Typed_Array,
    Int8Array         = 0b0000_0001 | ETypeByteCode.Typed_Array,
    Uint8Array        = 0b0000_0010 | ETypeByteCode.Typed_Array,
    Uint8ClampedArray = 0b0000_0011 | ETypeByteCode.Typed_Array,
    Int16Array        = 0b0000_0100 | ETypeByteCode.Typed_Array,
    Uint16Array       = 0b0000_0101 | ETypeByteCode.Typed_Array,
    Int32Array        = 0b0000_0110 | ETypeByteCode.Typed_Array,
    Uint32Array       = 0b0000_0111 | ETypeByteCode.Typed_Array,
    Float32Array      = 0b0000_1000 | ETypeByteCode.Typed_Array,
    Float64Array      = 0b0000_1001 | ETypeByteCode.Typed_Array,
    BigInt64Array     = 0b0000_1010 | ETypeByteCode.Typed_Array,
    BigUint64Array    = 0b0000_1011 | ETypeByteCode.Typed_Array,
}
