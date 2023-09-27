import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { TTypedArray } from '../types/TTypedArray';
export declare const decodeTypedArrayStream: (typeByte: number, stream: ByteStream, options: IDecodeOptions) => Promise<TTypedArray | ArrayBuffer>;
