import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { TDataViewGetter } from '../types/TDataViewGetter';
import { TTypedArray } from '../types/TTypedArray';
export type TTypedArrayConstructor = {
    new (init: number): TTypedArray;
};
export declare const typedArrayConstructorByType: Record<number, TTypedArrayConstructor>;
export declare const dataViewGetter: Record<number, TDataViewGetter>;
export declare const decodeTypedArray: (typeByte: number, stream: ByteStream, options: IDecodeOptions) => TTypedArray | ArrayBuffer;
