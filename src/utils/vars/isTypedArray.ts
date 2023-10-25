import { TTypedArray } from '../../types/TTypedArray';

export const isTypedArray = (value: any): value is TTypedArray => {
    return (
        typeof(ArrayBuffer) !== 'undefined' && value instanceof ArrayBuffer ||
        typeof(Int8Array) !== 'undefined' && value instanceof Int8Array ||
        typeof(Uint8Array) !== 'undefined' && value instanceof Uint8Array ||
        typeof(Uint8ClampedArray) !== 'undefined' && value instanceof Uint8ClampedArray ||
        typeof(Int16Array) !== 'undefined' && value instanceof Int16Array ||
        typeof(Uint16Array) !== 'undefined' && value instanceof Uint16Array ||
        typeof(Int32Array) !== 'undefined' && value instanceof Int32Array ||
        typeof(Uint32Array) !== 'undefined' && value instanceof Uint32Array ||
        typeof(Float32Array) !== 'undefined' && value instanceof Float32Array ||
        typeof(Float64Array) !== 'undefined' && value instanceof Float64Array ||
        typeof(BigInt64Array) !== 'undefined' && value instanceof BigInt64Array ||
        typeof(BigUint64Array) !== 'undefined' && value instanceof BigUint64Array
    );
};
