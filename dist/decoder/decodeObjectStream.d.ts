import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
export declare const decodeObjectStream: (typeByte: number, stream: ByteStream, options: IDecodeOptions, initObj?: Record<string | symbol | number, any>) => Promise<Record<string | symbol | number, any>>;
