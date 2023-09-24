
export interface IDecodeContext {
    refs: any[];
    refByteSlice: {
        index: number;
        length: number;
    }[];
}

export interface IDecodeOptions {
    context: IDecodeContext,
    refs: {
        readOnly: boolean,
    },
}