import { TUint8 } from '../types/TUint8';

// reusable shared buffers
const _buffer = new ArrayBuffer(8);
const _float64 = new Float64Array(_buffer);
const _uint8 = new Uint8Array(_buffer);

export const doubleToBytes = (value: number, bigEndianOrder = false): TUint8 => {
    _float64[0] = value;

    if (!bigEndianOrder) {
        // little-endian fast path
        return [
            _uint8[0],
            _uint8[1],
            _uint8[2],
            _uint8[3],
            _uint8[4],
            _uint8[5],
            _uint8[6],
            _uint8[7],
        ];
    }

    // big-endian (rare path)
    return [
        _uint8[7],
        _uint8[6],
        _uint8[5],
        _uint8[4],
        _uint8[3],
        _uint8[2],
        _uint8[1],
        _uint8[0],
    ];
};