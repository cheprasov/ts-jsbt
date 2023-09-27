import ByteStream from './reader/ByteStream';
export declare class JSBT {
    static encode(value: any): string;
    static decode<T = any>(value: string | string[] | number[]): T;
    static decodeStream<T = any>(stream: ByteStream): Promise<T>;
}
