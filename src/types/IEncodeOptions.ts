export interface IFloatOptions {
}

export interface IArrayOptions {
}

export interface ITypedArrayOptions {
}

export interface IRefsOptions {
    enabled: boolean;
}

export interface IRefData {
    refId: number;
    encodedChars: string | null;
    encodedRef: string;
    encodedRefCopy: string;
}

export interface IEncodingContext {
    refMap: Map<any, IRefData>;
    refCopy: Map<string, IRefData>;
}



export interface IEncodeOptions {
    context: IEncodingContext,
    float?: IFloatOptions,
    array?: IArrayOptions,
    typedArray?: ITypedArrayOptions,
    refs?: IRefsOptions;
}