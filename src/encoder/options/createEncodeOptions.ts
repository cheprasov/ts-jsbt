import { IEncodeOptions } from '../../types/IEncodeOptions';
import { ByteInternMap } from '../../utils/map/ByteInternMap';
import { BytesWriter } from '../../writer/BytesWriter';

export const createEncodeOptions = (): IEncodeOptions => {
    return {
        refs: {
            enabled: false,
        },
        context: {
            refMap: new Map(),
            refCopy: new ByteInternMap(),
        },
        objects: {
            classInstanceConstructorNameKey: '__jsbtConstructorName',
        },
        writer: new BytesWriter(),
    };
};
