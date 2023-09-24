import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeArray } from './decodeArray';
import { decodeBigInt } from './decodeBigInt';
import { decodeConstant } from './decodeConstant';
import { decodeFloat } from './decodeFloat';
import { decodeInteger } from './decodeInteger';
import { decodeMap } from './decodeMap';
import { decodeObject } from './decodeObject';
import { decodeRef } from './decodeRef';
import { decodeSet } from './decodeSet';
import { decodeString } from './decodeString';
import { decodeSymbol } from './decodeSymbol';
import { decodeTypedArray } from './decodeTypedArray';

export const decode = (typeByte: number | null, stream: ByteStream, options: IDecodeOptions): any => {
    const { refs, refByteSlice } = options.context;

    if (typeByte === null) {
        typeByte = stream.readByte();
    }
    const type = typeByte & 0b1111_0000;

    const isRefLink = (type === ETypeByteCode.Refs);
    const refId = refs.length;
    let isRefAllowed = true;
    if (!isRefLink) {
        refs.push(null); // keep place
        refByteSlice.push({
            index: stream.getReadBytesIndex() - 1,
            length: 0,
        });
    }

    let result: any;
    let isResultReceived: boolean = false;

    switch (type) {
        case ETypeByteCode.Constant: {
            result = decodeConstant(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = false;
            break;
        }
        case ETypeByteCode.String: {
            result = decodeString(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = result.length > 2
            break;
        }
        case ETypeByteCode.Integer: {
            result = decodeInteger(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = result > 255 || result < -255;
            break;
        }
        case ETypeByteCode.Float: {
            result = decodeFloat(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.BigInt: {
            result = decodeBigInt(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Array: {
            result = decodeArray(typeByte, stream, options);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Typed_Array: {
            result = decodeTypedArray(typeByte, stream, options);
            isResultReceived = true;
            break;
        }
        case ETypeByteCode.Object: {
            result = decodeObject(typeByte, stream, options);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Set: {
            result = decodeSet(typeByte, stream, options);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Map: {
            result = decodeMap(typeByte, stream, options);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Symbol: {
            result = decodeSymbol(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Refs: {
            result = decodeRef(typeByte, stream, options);
            isResultReceived = true;
            isRefAllowed = false;
            break;
        }
    }

    if (isResultReceived === false) {
        throw new Error(`Unsupported decoding value: "${typeByte}"`);
    }

    if (!isRefLink) {
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
