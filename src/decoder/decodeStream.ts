import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeArrayStream } from './decodeArrayStream';
import { decodeBigIntStream } from './decodeBigIntStream';
import { decodeConstantStream } from './decodeConstantStream';
import { decodeDateStream } from './decodeDateStream';
import { decodeFloatStream } from './decodeFloatStream';
import { decodeIntegerStream } from './decodeIntegerStream';
import { decodeMapStream } from './decodeMapStream';
import { decodeObjectStream } from './decodeObjectStream';
import { decodeRefStream } from './decodeRefStream';
import { decodeSetStream } from './decodeSetStream';
import { decodeStringStream } from './decodeStringStream';
import { decodeSymbolStream } from './decodeSymbolStream';
import { decodeTypedArrayStream } from './decodeTypedArrayStream';

export const decodeStream = async (
    typeByte: number | null,
    stream: ByteStream,
    options: IDecodeOptions
): Promise<any> => {
    const { refs, refByteSlice } = options.context;

    if (typeByte === null) {
        typeByte = await stream.readStreamByte();
    }
    const type = typeByte & 0b1111_0000;

    const isRefEnabled = !(type === ETypeByteCode.Refs);
    const refId = refs.length;
    let isRefAllowed = true;
    if (isRefEnabled) {
        refs.push(undefined); // keep place
        refByteSlice.push({
            index: stream.getReadBytesIndex() - 1,
            length: 0,
        });
    }

    let result: any;
    let isResultReceived: boolean = false;

    switch (type) {
        case ETypeByteCode.Refs: {
            result = await decodeRefStream(typeByte, stream, options);
            isResultReceived = true;
            isRefAllowed = false;
            break;
        }
        case ETypeByteCode.Constant: {
            result = await decodeConstantStream(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = false;
            break;
        }
        case ETypeByteCode.String: {
            result = await decodeStringStream(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = result.length > 2;
            break;
        }
        case ETypeByteCode.Integer: {
            result = await decodeIntegerStream(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = result > 255 || result < -255;
            break;
        }
        case ETypeByteCode.Float: {
            result = await decodeFloatStream(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.BigInt: {
            result = await decodeBigIntStream(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Array: {
            result = await decodeArrayStream(typeByte, stream, options, (refs[refId] = []));
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Typed_Array: {
            result = await decodeTypedArrayStream(typeByte, stream, options);
            isResultReceived = true;
            break;
        }
        case ETypeByteCode.Object: {
            result = await decodeObjectStream(typeByte, stream, options, (refs[refId] = {}));
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Set: {
            result = await decodeSetStream(typeByte, stream, options, (refs[refId] = new Set()));
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Map: {
            result = await decodeMapStream(typeByte, stream, options, (refs[refId] = new Map()));
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Symbol: {
            result = await decodeSymbolStream(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Date: {
            result = await decodeDateStream(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = Math.abs(result.getTime()) > 255;
            break;
        }
    }

    if (isResultReceived === false) {
        throw new Error(`Unsupported decoding value: "${typeByte}"`);
    }

    if (isRefEnabled) {
        if (isRefAllowed) {
            refs[refId] = result;
            refByteSlice[refId].length = stream.getReadBytesIndex() - refByteSlice[refId].index;
        } else {
            refs.pop();
            refByteSlice.pop();
        }
    }
    return result;
};
