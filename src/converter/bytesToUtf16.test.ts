import { bytesToUtf16 } from './bytesToUtf16';

describe('bytesToUtf16', () => {

    it('should convert array with bytes to utf16 string', () => {
        expect(bytesToUtf16([60, 216, 236, 221, 60, 216, 231, 221])).toEqual('🇬🇧');
        expect(bytesToUtf16([65, 108, 101, 120])).toEqual('Alex');
        expect(bytesToUtf16([73, 61, 216, 150, 220, 74, 83])).toEqual('I💖JS');
    });

    it('should convert uint8 array to utf16 string', () => {
        expect(bytesToUtf16(new Uint8Array([60, 216, 236, 221, 60, 216, 231, 221]))).toEqual('🇬🇧');
        expect(bytesToUtf16(new Uint8Array([65, 108, 101, 120]))).toEqual('Alex');
        expect(bytesToUtf16(new Uint8Array([73, 61, 216, 150, 220, 74, 83]))).toEqual('I💖JS');
    });

});