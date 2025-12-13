import { EConstantByteCode } from '../enums/EConstantByteCode';
import { IDataWriter } from '../writer/IDataWriter';

const POS_INFINITY = EConstantByteCode.Pos_Infinity;
const NEG_INFINITY = EConstantByteCode.Neg_Infinity;

export const encodeInfinity = (value: number, writer: IDataWriter): number => {
    if (value !== Infinity && value !== -Infinity) {
        throw new Error(`Expecting "Infinity", received "${value}" (${typeof value})`);
    }
    return writer.pushByte(value > 0 ? POS_INFINITY : NEG_INFINITY);
};
