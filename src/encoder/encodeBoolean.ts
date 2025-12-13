import { EConstantByteCode } from '../enums/EConstantByteCode';
import { IDataWriter } from '../writer/IDataWriter';

const TRUE_BYTE = EConstantByteCode.TRUE;
const FALSE_BYTE = EConstantByteCode.FALSE;

export const encodeBoolean = (value: boolean, writer: IDataWriter): number => {
    if (typeof value !== 'boolean') {
        throw new Error(`Expecting "boolean" type, received "${value}" (${typeof value})`);
    }
    return writer.pushByte(value ? TRUE_BYTE : FALSE_BYTE)
}