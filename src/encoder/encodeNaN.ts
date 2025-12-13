import { EConstantByteCode } from '../enums/EConstantByteCode';
import { IDataWriter } from '../writer/IDataWriter';

const NAN_BYTE = EConstantByteCode.NaN;

export const encodeNaN = (writer: IDataWriter): number => {
    return writer.pushByte(NAN_BYTE);
}