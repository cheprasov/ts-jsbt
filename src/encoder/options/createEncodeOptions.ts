import { IEncodeOptions } from '../../types/IEncodeOptions';

export const createEncodeOptions = (): IEncodeOptions => {
    return {
        refs: {
            enabled: false
        },
        context: {
            refMap: new Map(),
            refCopy: new Map(),
        },
        primitives: {
            objectWrappersAsPrimitiveValue: false,
        },
        objects: {
            classInstanceConstructorNameKey: '__jsbtConstructorName',
        }
    }
}