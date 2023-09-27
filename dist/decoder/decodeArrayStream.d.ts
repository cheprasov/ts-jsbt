import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
export declare const decodeArrayStream: (typeByte: number, stream: ByteStream, options: IDecodeOptions, initArr?: any[]) => Promise<any[]>;
