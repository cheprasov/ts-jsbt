import { ETypeByteCode } from '../enums/ETypeByteCode';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { TPrimitiveObjectWrapper } from '../types/TPrimitiveObjectWrapper';
import { isPrimitiveObjectWrapper } from '../utils/vars/isPrimitiveObjectWrapper';
import { encode } from './encode';

const INSTRUCTION_BYTE = ETypeByteCode.Instruction & 0b1111_0000;

export const encodePrimitiveObjectWrapper = (obj: TPrimitiveObjectWrapper, options: IEncodeOptions): number => {
    if (!isPrimitiveObjectWrapper(obj)) {
        throw new Error(`Expecting Promitive Object Wrapper, received "${obj}" (${typeof obj})`);
    }

    const writer = options.writer;

    writer.pushByte(INSTRUCTION_BYTE);
    return encode(obj.valueOf(), options);
};
