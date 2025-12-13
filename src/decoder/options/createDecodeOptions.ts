import { IDecodeOptions } from '../../types/IDecodeOptions';
import { BytesWriter } from '../../writer/BytesWriter';

export const createDecodeOptions = (): IDecodeOptions => {
    return {
        context: {
            refs: [],
            refByteSlice: [],
            readBytes: [],
        },
        objects: {
            classInstanceConstructorNameKey: '__jsbtConstructorName',
            factories: {},
        },
        writer: new BytesWriter(),
    };
};
