import { IDataWriter } from '../writer/IDataWriter';

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

export interface IEncodeObjectOptions {
    classInstanceConstructorNameKey: string | null;
}

export interface IEncodeOptions {
    context: IEncodingContext;
    refs: IRefsOptions;
    objects: IEncodeObjectOptions;
    writer: IDataWriter;
}
