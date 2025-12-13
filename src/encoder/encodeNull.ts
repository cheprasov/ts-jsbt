import { EConstantByteCode } from '../enums/EConstantByteCode';
import { IDataWriter } from '../writer/IDataWriter';

const NULL_BYTE = EConstantByteCode.Null;

export const encodeNull = (writer: IDataWriter): number => {
    return writer.pushByte(NULL_BYTE);
}