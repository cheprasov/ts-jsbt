import { IDecodeOptions } from '../../types/IDecodeOptions';

export const createDecodeOptions = (): IDecodeOptions => {
    return {
        refs: {
            readOnly: false,
        },
        context: {
            refs: [],
            refByteSlice: [],
        },
    }
}