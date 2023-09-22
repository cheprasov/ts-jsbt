import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeArray } from './decodeArray';
import { decodeBigInt } from './decodeBigInt';
import { decodeConstant } from './decodeConstant';
import { decodeFloat } from './decodeFloat';
import { decodeInteger } from './decodeInteger';
import { decodeString } from './decodeString';

export const decode = (typeByte: number | null, stream: ByteStream, options: IDecodeOptions): any => {
    const context = options.context;

    if (typeByte === null) {
        typeByte = stream.readByte();
    }

    let result: any;
    let isResultReceived : boolean = false;

    const type = typeByte & 0b1111_0000;
    switch (type) {
        case ETypeByteCode.Constant: {
            result = decodeConstant(typeByte, stream);
            isResultReceived = true;
            break;
        }
        case ETypeByteCode.String: {
            result = decodeString(typeByte, stream);
            isResultReceived = true;
            break;
        }
        case ETypeByteCode.Integer: {
            result = decodeInteger(typeByte, stream);
            isResultReceived = true;
            break;
        }
        case ETypeByteCode.Float: {
            result = decodeFloat(typeByte, stream);
            isResultReceived = true;
            break;
        }
        case ETypeByteCode.BigInt: {
            result = decodeBigInt(typeByte, stream);
            isResultReceived = true;
            break;
        }
        case ETypeByteCode.Array: {
            result = decodeArray(typeByte, stream, options);
            isResultReceived = true;
        }
    }

    if (isResultReceived === false) {
        throw new Error(`Unsupported decoding value: "${typeByte}"`);
    }

    return result;
};
