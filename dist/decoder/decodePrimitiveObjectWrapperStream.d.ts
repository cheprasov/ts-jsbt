import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { TPrimitiveObjectWrapper } from '../types/TPrimitiveObjectWrapper';
export declare const decodePrimitiveObjectWrapperStream: (typeByte: number, stream: ByteStream, options: IDecodeOptions) => Promise<TPrimitiveObjectWrapper>;
