import { EConstantByteCode } from '../enums/EConstantByteCode';
import ByteStream from '../reader/ByteStream';
import { decodeConstant } from './decodeConstant';

describe('decodeConstant', () => {

    it('should decode constant correct', () => {
        const stream = new ByteStream();
        expect(decodeConstant(EConstantByteCode.FALSE, stream)).toBe(false);
        expect(decodeConstant(EConstantByteCode.TRUE, stream)).toBe(true);
        expect(decodeConstant(EConstantByteCode.Null, stream)).toBe(null);
        expect(decodeConstant(EConstantByteCode.Undefined, stream)).toBe(undefined);
        expect(decodeConstant(EConstantByteCode.NaN, stream)).toBeNaN();
        expect(decodeConstant(EConstantByteCode.Pos_Infinity, stream)).toBe(+Infinity);
        expect(decodeConstant(EConstantByteCode.Neg_Infinity, stream)).toBe(-Infinity);
        expect(decodeConstant(EConstantByteCode.Empty_Value, stream)).toBe('');
    });

});