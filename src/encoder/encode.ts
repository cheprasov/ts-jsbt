import { IEncodeOptions, IRefData } from '../types/IEncodeOptions';
import { isFloat } from '../utils/vars/isFloat';
import { isInteger } from '../utils/vars/isInteger';
import { isMap } from '../utils/vars/isMap';
import { isObject } from '../utils/vars/isObject';
import { isSet } from '../utils/vars/isSet';
import { isTypedArray } from '../utils/vars/isTypedArray';
import { encodeArray } from './encodeArray';
import { encodeBigInt } from './encodeBigInt';
import { encodeBoolean } from './encodeBoolean';
import { encodeFloat } from './encodeFloat';
import { encodeInfinity } from './encodeInfinity';
import { encodeInteger } from './encodeInteger';
import { encodeMap } from './encodeMap';
import { encodeNaN } from './encodeNaN';
import { encodeNull } from './encodeNull';
import { encodeObject } from './encodeObject';
import { encodeRef } from './encodeRef';
import { encodeSet } from './encodeSet';
import { encodeString } from './encodeString';
import { encodeSymbol } from './encodeSymbol';
import { encodeTypedArray } from './encodeTypedArray';
import { encodeUndefined } from './encodeUndefined';

export const encode = (value: any, options: IEncodeOptions): string => {
    const context = options.context;
    const isRefEnabled = options.refs?.enabled || false;

    let refData: IRefData | null = null;
    if (isRefEnabled) {
        refData = context.refMap.get(value) || null;
        if (refData) {
            return refData.encodedRef;
        } else {
            const refId = context.refMap.size;
            refData = {
                refId: refId,
                encodedChars: null,
                encodedRef: encodeRef('link', refId, options),
                encodedRefCopy: encodeRef('copy', refId, options),
            }
            context.refMap.set(value, refData);
        }
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
                isRefAllowed = (value > 255 || value < -255);
                result = encodeInteger(value);
                break;
            }
            if (isFloat(value)) {
                isRefAllowed = true;
                result = encodeFloat(value);
                break;
            }
            if (Number.isNaN(value)) {
                isRefAllowed = true;
                result = encodeNaN();
                break;
            }
            if (value === Infinity || value === -Infinity) {
                isRefAllowed = true;
                result = encodeInfinity(value);
                break;
            }
            break;
        }
        case 'string': {
            isRefAllowed = value.length > 2;
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
                isRefAllowed = true;
                result = encodeTypedArray(value, options);
                break;
            }
            break;
        }
        case 'bigint': {
            isRefAllowed = true;
            result = encodeBigInt(value);
            break;
        }
        case 'symbol': {
            isRefAllowed = true;
            result = encodeSymbol(value);
            break;
        }
    }

    if (result === null) {
        throw new Error(`Unsupported encoding value: "${value}", type: "${type}"`);
    }

    if (refData) {
        refData.encodedChars = result;
    }

    if (!isRefAllowed) {
        context.refMap.delete(value);
        return result;
    }

    const refCopy = context.refCopy.get(result);
    if (refCopy) {
        return refCopy.encodedRefCopy;
    }

    return result;
}