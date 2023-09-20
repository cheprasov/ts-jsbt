import { encodeArray } from './encoder/encodeArray';
import { encodeBigInt } from './encoder/encodeBigInt';
import { encodeBoolean } from './encoder/encodeBoolean';
import { encodeFloat } from './encoder/encodeFloat';
import { encodeInfinity } from './encoder/encodeInfinity';
import { encodeInteger } from './encoder/encodeInteger';
import { encodeMap } from './encoder/encodeMap';
import { encodeNaN } from './encoder/encodeNaN';
import { encodeNull } from './encoder/encodeNull';
import { encodeObject } from './encoder/encodeObject';
import { encodeRefCopy } from './encoder/encodeRefCopy';
import { encodeRefCreating } from './encoder/encodeRefCreating';
import { encodeRefUsing } from './encoder/encodeRefUsing';
import { encodeSet } from './encoder/encodeSet';
import { encodeString } from './encoder/encodeString';
import { encodeSymbol } from './encoder/encodeSymbol';
import { encodeTypedArray } from './encoder/encodeTypedArray';
import { encodeUndefined } from './encoder/encodeUndefined';
import { createEncodeOptions } from './encoder/options/createEncodeOptions';
import { IEncodeOptions, IRefData } from './types/IEncodeOptions';
import { isFloat } from './utils/vars/isFloat';
import { isInteger } from './utils/vars/isInteger';
import { isMap } from './utils/vars/isMap';
import { isObject } from './utils/vars/isObject';
import { isSet } from './utils/vars/isSet';
import { isTypedArray } from './utils/vars/isTypedArray';

export class JSBT {
    static encode(value: any, options: IEncodeOptions = createEncodeOptions()): string {
        const isTopLevel = options.topLevel;
        options.topLevel = false;

        const context = options.context;
        const refData = context.refMap.get(value);
        if (refData) {
            refData.count += 1;
            return refData.encodedRef;
        }

        let result: string | null = null;
        let isRefAllowed: boolean = false;

        const type = typeof value;
        switch (type) {
            case 'undefined': {
                isRefAllowed = false;
                result = encodeUndefined();
                break;
            }
            case 'boolean': {
                isRefAllowed = false;
                result = encodeBoolean(value);
                break;
            }
            case 'number': {
                if (isInteger(value)) {
                    isRefAllowed = !isTopLevel && (value > 255 || value < -255);
                    result = encodeInteger(value);
                    break;
                }
                if (isFloat(value)) {
                    isRefAllowed = !isTopLevel;
                    result = encodeFloat(value);
                    break;
                }
                if (Number.isNaN(value)) {
                    isRefAllowed = !isTopLevel;
                    result = encodeNaN();
                    break;
                }
                if (value === Infinity || value === -Infinity) {
                    isRefAllowed = !isTopLevel;
                    result = encodeInfinity(value);
                    break;
                }
                break;
            }
            case 'string': {
                isRefAllowed = !isTopLevel && value.length > 2;
                result = encodeString(value);
                break;
            }
            case 'object': {
                if (value === null) {
                    isRefAllowed = false;
                    result = encodeNull();
                    break;
                }
                if (Array.isArray(value)) {
                    isRefAllowed = true;
                    result = encodeArray(value, options);
                    break;
                }
                if (isObject(value)) {
                    isRefAllowed = true;
                    result = encodeObject(value, options);
                    break;
                }
                if (isSet(value)) {
                    isRefAllowed = true;
                    result = encodeSet(value, options);
                    break;
                }
                if (isMap(value)) {
                    isRefAllowed = true;
                    result = encodeMap(value, options);
                    break;
                }
                if (isTypedArray(value)) {
                    isRefAllowed = !isTopLevel;
                    result = encodeTypedArray(value, options);
                    break;
                }
                break;
            }
            case 'bigint': {
                isRefAllowed = !isTopLevel;
                result = encodeBigInt(value);
                break;
            }
            case 'symbol': {
                isRefAllowed = !isTopLevel;
                result = encodeSymbol(value);
                break;
            }
        }

        if (result === null) {
            throw new Error(`Unsupported encoding value: "${value}", type: "${type}"`);
        }

        const refCopy = context.refCopy.get(result);
        if (refCopy) {
            return refCopy.encodedRefCopy;
        }

        if (isRefAllowed) {
            const refId = context.refMap.size;
            const refData: IRefData = {
                count: 1,
                encodedChars: result,
                encodedRef: encodeRefUsing(refId, options),
                encodedRefCopy: encodeRefCopy(refId, options),
            };
            context.refMap.set(value, refData);
            context.refCopy.set(result, refData);
            if (!isTopLevel) {
                return refData.encodedRef;
            }
        }

        if (isTopLevel && context.refMap.size) {
            // encode all refs
            const values: string[] = [];
            context.refMap.forEach((refData) => {
                values.push(refData.encodedChars);
            });
            const econdedRefs = encodeRefCreating(values, options);
            return `${econdedRefs}${result}`;
        }

        return result;
    }

    static decode<T = any>(value: string): T {
        return '' as T;
    }
}
