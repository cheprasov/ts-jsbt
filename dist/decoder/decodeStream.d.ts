import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
export declare const decodeStream: (typeByte: number | null, stream: ByteStream, options: IDecodeOptions) => Promise<any>;
