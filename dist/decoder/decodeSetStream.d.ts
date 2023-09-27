import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
export declare const decodeSetStream: (typeByte: number, stream: ByteStream, options: IDecodeOptions, initSet?: Set<any>) => Promise<Set<any>>;
