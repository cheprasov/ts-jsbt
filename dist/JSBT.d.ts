import ByteStream from './reader/ByteStream';
import { TDecodeClassConstructor } from './types/IDecodeOptions';
export declare class JSBT {
    protected static _classFactories: Record<string, TDecodeClassConstructor<object>>;
    static setClassFactories(factories: Record<string, TDecodeClassConstructor<object>>): void;
    static encode(value: any): string;
    static decode<T = any>(value: string | string[] | number[]): T;
    static decodeStream<T = any>(stream: ByteStream): Promise<T>;
}
