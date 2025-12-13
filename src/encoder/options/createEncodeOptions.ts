import { IEncodeOptions } from '../../types/IEncodeOptions';
import { BytesWriter } from '../../writer/BytesWriter';

export const createEncodeOptions = (): IEncodeOptions => {
    return {
        refs: {
            enabled: false,
        },
        context: {
            refMap: new Map(),
            refCopy: new Map(),
        },
        objects: {
            classInstanceConstructorNameKey: '__jsbtConstructorName',
        },
        writer: new BytesWriter(),
    };
};
