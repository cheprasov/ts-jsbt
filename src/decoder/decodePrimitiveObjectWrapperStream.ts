import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { TPrimitiveObjectWrapper } from '../types/TPrimitiveObjectWrapper';
import { decodeStream } from './decodeStream';

export const decodePrimitiveObjectWrapperStream = async (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions
): Promise<TPrimitiveObjectWrapper> => {
    if (typeByte !== (ETypeByteCode.Instruction | 0b0000_0000)) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding primitive object wrapper`);
    }

    const value = await decodeStream(null, stream, options);
    switch (typeof value) {
        case 'string': return new String(value);
        case 'boolean': return new Boolean(value);
        case 'number': return new Number(value);
    }

    throw new Error(`Can not create Primitive Object Wrapper for value ${value}, type ${typeof value}`);
};
