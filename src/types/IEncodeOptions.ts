export interface IFloatOptions {
}

export interface IArrayOptions {
}

export interface ITypedArrayOptions {
}

export interface IRefData {
    count: number;
    encodedChars: string;
    encodedRef: string;
    encodedRefCopy: string;
}

export interface IEncodingContext {
    refMap: Map<any, IRefData>;
    refCopy: Map<string, IRefData>;
}

export interface IEncodeOptions {
    topLevel: boolean,
    context: IEncodingContext,
    float?: IFloatOptions,
    array?: IArrayOptions,
    typedArray?: ITypedArrayOptions,
}