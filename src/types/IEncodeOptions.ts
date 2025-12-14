import { ByteInternMap } from '../utils/map/ByteInternMap';
import { IDataWriter } from '../writer/IDataWriter';

export interface IRefsOptions {
    enabled: boolean;
}

export interface IRefData {
    refId: number;
    encodedRefLink: Uint8Array | null;
    encodedRefCopy: Uint8Array | null;
}

export interface IEncodingContext {
    refMap: Map<any, IRefData>;
    refCopy: ByteInternMap<IRefData>;
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
