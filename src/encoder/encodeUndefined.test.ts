import { encodeUndefined } from './encodeUndefined';
import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString'
import { IDataWriter } from '../writer/IDataWriter';
import { BytesWriter } from '../writer/BytesWriter';

describe('encodeUndefined', () => {
    let writer: IDataWriter;

    beforeEach(() => {
        writer = new BytesWriter();
    });

    it('should encode Undefined correct', () => {
        encodeUndefined(writer);
        expectAsBinaryString(writer.toString()).toBe('00000011');
    });

});