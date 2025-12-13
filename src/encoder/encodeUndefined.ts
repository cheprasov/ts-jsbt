import { EConstantByteCode } from '../enums/EConstantByteCode';
import { IDataWriter } from '../writer/IDataWriter';

const UNDEFINED_BYTE = EConstantByteCode.Undefined

export const encodeUndefined = (writer: IDataWriter): number => {
    return writer.pushByte(UNDEFINED_BYTE);
}