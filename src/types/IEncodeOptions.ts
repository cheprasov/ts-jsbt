import EncodingContext from '../encoder/EncodingContext';

export interface IFloatOptions {
}

export interface IArrayOptions {
}

export interface ITypedArrayOptions {
}

export interface IEncodeOptions {
    context?: EncodingContext,
    float?: IFloatOptions,
    array?: IArrayOptions,
    typedArray?: ITypedArrayOptions,
}