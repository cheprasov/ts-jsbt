export enum ETypeByteCode {
    Constant    = 0b0000_0000,
    String      = 0b0001_0000,
    Integer     = 0b0010_0000,
    Float       = 0b0011_0000,
    BigInt      = 0b0100_0000,
    Array       = 0b0101_0000,
    Typed_Array = 0b0110_0000,
    Object      = 0b0111_0000,
    Set         = 0b1000_0000,
    Map         = 0b1001_0000,
    Symbol      = 0b1010_0000,
    Refs        = 0b1011_0000,
}