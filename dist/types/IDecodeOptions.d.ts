export interface IDecodeContext {
    refs: any[];
    refByteSlice: {
        index: number;
        length: number;
    }[];
    readBytes: Readonly<number[]>;
}
export interface IDecodeOptions {
    context: IDecodeContext;
}
