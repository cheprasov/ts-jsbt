export interface IPrimitivesOptions {
    objectWrappersAsPrimitiveValue: boolean;
}
export interface IRefsOptions {
    enabled: boolean;
}
export interface IRefData {
    refId: number;
    encodedRefLink: string | null;
    encodedRefCopy: string | null;
}
export interface IEncodingContext {
    refMap: Map<any, IRefData>;
    refCopy: Map<string, IRefData>;
}
export interface IEncodeOptions {
    context: IEncodingContext;
    refs: IRefsOptions;
    primitives: IPrimitivesOptions;
}
