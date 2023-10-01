export interface IDecodeContext {
    refs: any[];
    refByteSlice: {
        index: number;
        length: number;
    }[];
    readBytes: Readonly<number[]>;
}
export interface IDecodeObjectOptions {
    classInstanceConstructorNameKey: string | null;
}
export interface IDecodeOptions {
    context: IDecodeContext;
    objects: IDecodeObjectOptions;
}
