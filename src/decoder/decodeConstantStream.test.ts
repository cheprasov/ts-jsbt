import { EConstantByteCode } from '../enums/EConstantByteCode';
import ByteStream from '../reader/ByteStream';
import { decodeConstantStream } from './decodeConstantStream';

describe('decodeConstant', () => {

    it('should decode constant correct', async () => {
        const stream = new ByteStream();
        expect(await decodeConstantStream(EConstantByteCode.FALSE, stream)).toBe(false);
        expect(await decodeConstantStream(EConstantByteCode.TRUE, stream)).toBe(true);
        expect(await decodeConstantStream(EConstantByteCode.Null, stream)).toBe(null);
        expect(await decodeConstantStream(EConstantByteCode.Undefined, stream)).toBe(undefined);
        expect(await decodeConstantStream(EConstantByteCode.NaN, stream)).toBeNaN();
        expect(await decodeConstantStream(EConstantByteCode.Pos_Infinity, stream)).toBe(+Infinity);
        expect(await decodeConstantStream(EConstantByteCode.Neg_Infinity, stream)).toBe(-Infinity);
        expect(await decodeConstantStream(EConstantByteCode.Empty_Value, stream)).toBe('');
    });

});