import { EConstantByteCode } from '../enums/EConstantByteCode';
import { IDataWriter } from '../writer/IDataWriter';

const EMPTY_VALUE_BYTE = EConstantByteCode.Empty_Value;

export const encodeEmptyValue = (writer: IDataWriter): number => {
    return writer.pushByte(EMPTY_VALUE_BYTE);
}