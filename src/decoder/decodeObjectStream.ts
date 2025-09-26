import { bytesToInteger } from '../converter/bytesToInteger';
import { ETypeByteCode } from '../enums/ETypeByteCode';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeStream } from './decodeStream';

export const decodeObjectStream = async (
    typeByte: number,
    stream: ByteStream,
    options: IDecodeOptions,
    initObj: Record<string | symbol | number, any> = {}
): Promise<Record<string | symbol | number, any>> => {
    if ((typeByte & 0b1111_0000) !== ETypeByteCode.Object) {
        throw new Error(`Provaded incorrect type ${typeByte} for decoding object`);
    }

    const bytesCount = typeByte & 0b0000_0111;
    if (bytesCount === 0) {
        return initObj;
    }

    const count = bytesToInteger(await stream.readStreamBytes(bytesCount));

    const isClassInstance = Boolean(typeByte & 0b0000_1000);
    const constructorName = isClassInstance ? await decodeStream(null, stream, options) : null;

    const obj: Record<string | symbol | number, any> = initObj;

    for (let i = 0; i < count; i += 1) {
        const key = await decodeStream(null, stream, options);
        const value = await decodeStream(null, stream, options);
        obj[key] = value;
    }

    if (isClassInstance) {
        const constructorNameKey = options.objects.classInstanceConstructorNameKey;
        if (constructorNameKey !== null) {
            const classConstructor = options.objects.factories[constructorName];
            if (classConstructor) {
                Object.setPrototypeOf(obj, classConstructor.prototype);
            } else {
                Object.defineProperty(obj, constructorNameKey, {
                    value: constructorName,
                    configurable: true,
                    enumerable: false,
                    writable: false,
                });
            }
        }
    }

    return obj;
};
