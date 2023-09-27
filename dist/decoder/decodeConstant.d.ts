import { EConstantByteCode } from '../enums/EConstantByteCode';
import ByteStream from '../reader/ByteStream';
export type TConstant = true | false | null | undefined | typeof NaN | typeof Infinity | '';
export declare const constantMap: Map<EConstantByteCode, TConstant>;
export declare const decodeConstant: (typeByte: number, stream: ByteStream) => TConstant;
