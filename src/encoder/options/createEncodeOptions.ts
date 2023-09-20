import { IEncodeOptions } from '../../types/IEncodeOptions';

export const createEncodeOptions = (): IEncodeOptions => {
    return {
        topLevel: true,
        context: {
            refMap: new Map(),
            refCopy: new Map(),
        },
    }
}