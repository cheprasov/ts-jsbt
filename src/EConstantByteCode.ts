import { ETypeByteCode } from './ETypeByteCode';

export enum EConstantByteCode {
    FALSE     = ETypeByteCode.Constant | 0b0000_0000,
    TRUE      = ETypeByteCode.Constant | 0b0000_0001,
    NULL      = ETypeByteCode.Constant | 0b0000_0010,
    Undefined = ETypeByteCode.Constant | 0b0000_0011,
}
