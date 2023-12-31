import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decode } from './decode';
import { createDecodeOptions } from './options/createDecodeOptions';

export const decodeRefStream = async (typeByte: number, stream: ByteStream, options: IDecodeOptions): Promise<any> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Refs) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding ref`);
    }

    const isCopy = Boolean(typeByte & 0b0000_1000);
    const count = typeByte & 0b0000_0111;
    const id = count === 0 ? 0 : bytesToInteger(await stream.readStreamBytes(count));

    const refs = options.context.refs;
    if (!(id in refs)) {
        throw new Error(`Incorrect ref ID ${id}, max id is ${refs.length}`);
    }

    if (isCopy) {
        const refSlice = options.context.refByteSlice[id];
        const slice = options.context.readBytes.slice(refSlice.index, refSlice.index + refSlice.length);
        const decOptions = createDecodeOptions();
        decOptions.context = options.context;
        const st = new ByteStream(slice);
        st.completeStream();
        const copy = decode(null, st, decOptions);
        return copy;
    }

    return refs[id];
};
