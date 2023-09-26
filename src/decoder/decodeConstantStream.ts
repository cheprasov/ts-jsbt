import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { TConstant, constantMap } from './decodeConstant';

export const decodeConstantStream = async (typeByte: number, stream: ByteStream): Promise<TConstant> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Constant) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding contant`);
    }
    if (!constantMap.has(typeByte)) {
        throw new Error('Not supported contsant for decoding');
    }
    return constantMap.get(typeByte);
};
