import { ETypeByteCode } from './ETypeByteCode';

export enum EConstantByteCode {
    FALSE        = ETypeByteCode.Constant | 0b0000_0000,
    TRUE         = ETypeByteCode.Constant | 0b0000_0001,
    Null         = ETypeByteCode.Constant | 0b0000_0010,
    Undefined    = ETypeByteCode.Constant | 0b0000_0011,
    NaN          = ETypeByteCode.Constant | 0b0000_0100,
    Pos_Infinity = ETypeByteCode.Constant | 0b0000_0101,
    Neg_Infinity = ETypeByteCode.Constant | 0b0000_0110,
    Empty_Value  = ETypeByteCode.Constant | 0b0000_0111,
}
