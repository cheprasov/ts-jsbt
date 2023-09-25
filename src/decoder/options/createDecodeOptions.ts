import { IDecodeOptions } from '../../types/IDecodeOptions';

export const createDecodeOptions = (): IDecodeOptions => {
    return {
        context: {
            refs: [],
            refByteSlice: [],
            readBytes: [],
        },
    }
}