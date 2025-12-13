import { IDataWriter } from '../writer/IDataWriter';

export interface IDecodeContext {
    refs: any[];
    refByteSlice: {
        index: number;
        length: number;
    }[];
    readBytes: Readonly<number[]>;
}

export type TDecodeClassConstructor<T extends object> = new (...args: any[]) => T;

export interface IDecodeObjectOptions {
    classInstanceConstructorNameKey: string | null;
    factories: Record<string, TDecodeClassConstructor<any>>
}

export interface IDecodeOptions {
    context: IDecodeContext;
    objects: IDecodeObjectOptions;
    writer: IDataWriter;
}