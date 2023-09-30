import { ETypeByteCode } from '../enums/ETypeByteCode';
import { IEncodeOptions } from '../types/IEncodeOptions';
import { toChar } from '../utils/toChar';
import { TPrimitiveObjectWrapper } from '../types/TPrimitiveObjectWrapper';
import { isPrimitiveObjectWrapper } from '../utils/vars/isPrimitiveObjectWrapper';
import { encode } from './encode';

export const encodePrimitiveObjectWrapper = (obj: TPrimitiveObjectWrapper, options: IEncodeOptions): string => {
    if (!isPrimitiveObjectWrapper(obj)) {
        throw new Error(`Expecting Promitive Object Wrapper, received "${obj}" (${typeof obj})`);
    }

    const msg: string[] = [];

    msg.push(toChar(ETypeByteCode.Instruction & 0b1111_0000));
    msg.push(encode(obj.valueOf(), options));

    return msg.join('');
};
