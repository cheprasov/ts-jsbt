import { EConstantByteCode } from '../enums/EConstantByteCode';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';

export type TConstant = true | false | null | undefined | typeof NaN | typeof Infinity | '' ;

export const constantMap = new Map<EConstantByteCode, TConstant>([
    [EConstantByteCode.FALSE, false],
    [EConstantByteCode.TRUE, true],
    [EConstantByteCode.Null, null],
    [EConstantByteCode.Undefined, undefined],
    [EConstantByteCode.NaN, NaN],
    [EConstantByteCode.Pos_Infinity, +Infinity],
    [EConstantByteCode.Neg_Infinity, -Infinity],
    [EConstantByteCode.Empty_Value, ''],
]);

export const decodeConstant = (typeByte: number, stream: ByteStream): TConstant => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Constant) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding contant`);
    }
    if (!constantMap.has(typeByte)) {
        throw new Error('Not supported contsant for decoding')
    }
    return constantMap.get(typeByte);
};
