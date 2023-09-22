export interface IRefData {
    refId: number;
    encodedRefLink: string | null;
    encodedRefCopy: string | null;
}

export interface IDecodeContext {
    refMap: Map<any, IRefData>;
    refCopy: Map<string, IRefData>;
}

export interface IDecodeOptions {
    context: IDecodeContext,
}