import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeArray } from './decodeArray';
import { decodeBigInt } from './decodeBigInt';
import { decodeConstant } from './decodeConstant';
import { decodeDate } from './decodeDate';
import { decodeFloat } from './decodeFloat';
import { decodeInteger } from './decodeInteger';
import { decodeMap } from './decodeMap';
import { decodeObject } from './decodeObject';
import { decodePrimitiveObjectWrapper } from './decodePrimitiveObjectWrapper';
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
            result = decodeRef(typeByte, stream, options);
            isResultReceived = true;
            isRefAllowed = false;
            break;
        }
        case ETypeByteCode.Constant: {
            result = decodeConstant(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = false;
            break;
        }
        case ETypeByteCode.String: {
            result = decodeString(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = result.length > 2;
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
            result = decodeArray(typeByte, stream, options, (refs[refId] = []));
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
            result = decodeObject(typeByte, stream, options, (refs[refId] = {}));
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Set: {
            result = decodeSet(typeByte, stream, options, (refs[refId] = new Set()));
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Map: {
            result = decodeMap(typeByte, stream, options, (refs[refId] = new Map()));
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
        case ETypeByteCode.Date: {
            result = decodeDate(typeByte, stream);
            isResultReceived = true;
            isRefAllowed = true;
            break;
        }
        case ETypeByteCode.Instruction: {
            switch (typeByte) {
                case (ETypeByteCode.Instruction | 0b1111_0000): {
                    // Primitive Object Wrapper
                    result = decodePrimitiveObjectWrapper(typeByte, stream, options);
                    isResultReceived = true;
                    isRefAllowed = true;
                    break;
                }
                default: {
                    throw new Error(`Not supported instruction ${typeByte}`);
                }
            }
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
