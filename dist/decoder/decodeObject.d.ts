import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
export declare const decodeObject: (typeByte: number, stream: ByteStream, options: IDecodeOptions, initObj?: Record<string | symbol | number, any>) => Record<string | symbol | number, any>;
