import ByteStream from '../reader/ByteStream';
import { TConstant } from './decodeConstant';
export declare const decodeConstantStream: (typeByte: number, stream: ByteStream) => Promise<TConstant>;
