import { IEncodeOptions, IRefData } from '../types/IEncodeOptions';
import { isClassInstance } from '../utils/vars/isClassInstance';
import { isFloat } from '../utils/vars/isFloat';
import { isInteger } from '../utils/vars/isInteger';
import { isMap } from '../utils/vars/isMap';
import { isObject } from '../utils/vars/isObject';
import { isPrimitiveObjectWrapper } from '../utils/vars/isPrimitiveObjectWrapper';
import { isSet } from '../utils/vars/isSet';
import { isTypedArray } from '../utils/vars/isTypedArray';
import { encodeArray } from './encodeArray';
import { encodeBigInt } from './encodeBigInt';
import { encodeBoolean } from './encodeBoolean';
import { encodeClassInstance } from './encodeClassInstance';
import { encodeDate } from './encodeDate';
import { encodeFloat } from './encodeFloat';
import { encodeInfinity } from './encodeInfinity';
import { encodeInteger } from './encodeInteger';
import { encodeMap } from './encodeMap';
import { encodeNaN } from './encodeNaN';
import { encodeNull } from './encodeNull';
import { encodeObject } from './encodeObject';
import { encodePrimitiveObjectWrapper } from './encodePrimitiveObjectWrapper';
import { encodeRef } from './encodeRef';
import { encodeSet } from './encodeSet';
import { encodeString } from './encodeString';
import { encodeSymbol } from './encodeSymbol';
import { encodeTypedArray } from './encodeTypedArray';
import { encodeUndefined } from './encodeUndefined';

export const encode = (value: any, options: IEncodeOptions): string => {
    const context = options.context;
    const isRefEnabled = options.refs?.enabled || false;

    let val = value;

    if (isPrimitiveObjectWrapper(value) && options.primitives.objectWrappersAsPrimitiveValue) {
        val = value.valueOf(); // Primitive Object to Promitive Value
    }

    let refData: IRefData | null = null;
    if (isRefEnabled) {
        refData = context.refMap.get(val) || null;
        if (refData) {
            if (!refData.encodedRefLink) {
                refData.encodedRefLink = encodeRef('link', refData.refId, options);
            }
            return refData.encodedRefLink;
        } else {
            const refId = context.refMap.size;
            refData = {
                refId: refId,
                encodedRefLink: null,
                encodedRefCopy: null,
            };
            context.refMap.set(val, refData);
        }
    }

    let result: string | null = null;
    let isRefAllowed: boolean = false;

    const type = typeof val;
    switch (type) {
        case 'undefined': {
            isRefAllowed = false;
            result = encodeUndefined();
            break;
        }
        case 'boolean': {
            isRefAllowed = false;
            result = encodeBoolean(val);
            break;
        }
        case 'number': {
            if (isInteger(val)) {
                isRefAllowed = val > 255 || val < -255;
                result = encodeInteger(val);
                break;
            }
            if (isFloat(val)) {
                isRefAllowed = true;
                result = encodeFloat(val);
                break;
            }
            if (Number.isNaN(val)) {
                isRefAllowed = false;
                result = encodeNaN();
                break;
            }
            if (val === Infinity || val === -Infinity) {
                isRefAllowed = false;
                result = encodeInfinity(val);
                break;
            }
            break;
        }
        case 'string': {
            isRefAllowed = val.length > 2;
            result = encodeString(val);
            break;
        }
        case 'object': {
            if (val === null) {
                isRefAllowed = false;
                result = encodeNull();
                break;
            }
            if (Array.isArray(val)) {
                isRefAllowed = true;
                result = encodeArray(val, options);
                break;
            }
            if (isObject(val)) {
                isRefAllowed = true;
                result = encodeObject(val, options);
                break;
            }
            if (isSet(val)) {
                isRefAllowed = true;
                result = encodeSet(val, options);
                break;
            }
            if (isMap(val)) {
                isRefAllowed = true;
                result = encodeMap(val, options);
                break;
            }
            if (isTypedArray(val)) {
                isRefAllowed = true;
                result = encodeTypedArray(val, options);
                break;
            }
            if (val instanceof Date) {
                isRefAllowed = Math.abs(val.getTime()) > 255;
                result = encodeDate(val, options);
                break;
            }
            if (isPrimitiveObjectWrapper(val)) {
                isRefAllowed = true;
                result = encodePrimitiveObjectWrapper(val, options);
                break;
            }
            if (isClassInstance(val)) {
                isRefAllowed = true;
                result = encodeClassInstance(val, options);
                break;
            }
            break;
        }
        case 'bigint': {
            isRefAllowed = true;
            result = encodeBigInt(val);
            break;
        }
        case 'symbol': {
            isRefAllowed = true;
            result = encodeSymbol(val);
            break;
        }
    }

    if (result === null) {
        throw new Error(`Unsupported encoding value: "${val}", type: "${type}"`);
    }

    if (refData) {
        if (isRefAllowed) {
            const refCopy = context.refCopy.get(result);
            if (refCopy) {
                if (!refData.encodedRefCopy) {
                    refData.encodedRefCopy = encodeRef('copy', refCopy.refId, options);
                }
                return refData.encodedRefCopy;
            } else {
                context.refCopy.set(result, refData);
            }
        } else {
            context.refMap.delete(val);
        }
    }

    return result;
};
