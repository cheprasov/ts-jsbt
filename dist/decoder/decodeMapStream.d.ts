import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
export declare const decodeMapStream: (typeByte: number, stream: ByteStream, options: IDecodeOptions, initMap?: Map<any, any>) => Promise<Map<any, any>>;
