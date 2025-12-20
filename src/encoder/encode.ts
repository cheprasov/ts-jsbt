import { IEncodeOptions, IRefData } from '../types/IEncodeOptions';
import { isClassInstance } from '../utils/vars/isClassInstance';
import { isFloat } from '../utils/vars/isFloat';
import { isInteger } from '../utils/vars/isInteger';
import { isMap } from '../utils/vars/isMap';
import { isNullProtoObject } from '../utils/vars/isNullProtoObject';
import { isPlainObject } from '../utils/vars/isPlainObject';
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
    const isRefEnabled = options.refs.enabled || false;

    let refData: IRefData | null = null;
    if (isRefEnabled) {
        refData = context.refMap.get(value) || null;
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
            context.refMap.set(value, refData);
        }
    }

    let result: string | null = null;
    let isRefCopyAllowed: boolean = false;

    const type = typeof value;
    switch (type) {
        case 'undefined': {
            isRefCopyAllowed = false;
            result = encodeUndefined();
            break;
        }
        case 'boolean': {
            isRefCopyAllowed = false;
            result = encodeBoolean(value);
            break;
        }
        case 'number': {
            if (isInteger(value)) {
                isRefCopyAllowed = value > 255 || value < -255;
                result = encodeInteger(value);
                break;
            }
            if (isFloat(value)) {
                isRefCopyAllowed = true;
                result = encodeFloat(value);
                break;
            }
            if (Number.isNaN(value)) {
                isRefCopyAllowed = false;
                result = encodeNaN();
                break;
            }
            if (value === Infinity || value === -Infinity) {
                isRefCopyAllowed = false;
                result = encodeInfinity(value);
                break;
            }
            break;
        }
        case 'string': {
            isRefCopyAllowed = value.length > 2;
            result = encodeString(value);
            break;
        }
        case 'object': {
            if (value === null) {
                isRefCopyAllowed = false;
                result = encodeNull();
                break;
            }
            if (Array.isArray(value)) {
                isRefCopyAllowed = true;
                result = encodeArray(value, options);
                break;
            }
            if (isPlainObject(value)) {
                isRefCopyAllowed = true;
                result = encodeObject(value, options);
                break;
            }
            // if (isNullProtoObject(value)) {
            //     isRefCopyAllowed = true;
            //     result = encodeObject(value, options);
            //     break;
            // }
            if (isSet(value)) {
                isRefCopyAllowed = true;
                result = encodeSet(value, options);
                break;
            }
            if (isMap(value)) {
                isRefCopyAllowed = true;
                result = encodeMap(value, options);
                break;
            }
            if (isTypedArray(value)) {
                isRefCopyAllowed = true;
                result = encodeTypedArray(value, options);
                break;
            }
            if (value instanceof Date) {
                isRefCopyAllowed = true;
                result = encodeDate(value, options);
                break;
            }
            if (isPrimitiveObjectWrapper(value)) {
                isRefCopyAllowed = true;
                result = encodePrimitiveObjectWrapper(value, options);
                break;
            }
            if (isClassInstance(value)) {
                isRefCopyAllowed = true;
                result = encodeClassInstance(value, options);
                break;
            }
            break;
        }
        case 'bigint': {
            isRefCopyAllowed = true;
            result = encodeBigInt(value);
            break;
        }
        case 'symbol': {
            isRefCopyAllowed = true;
            result = encodeSymbol(value);
            break;
        }
    }

    if (result === null) {
        throw new Error(`Unsupported encoding value: "${String(value)}", type: "${String(type)}"`);
    }

    if (refData) {
        if (isRefCopyAllowed) {
            const refCopy = context.refCopy.get(result);
            if (refCopy) {
                if (!refData.encodedRefCopy) {
                    refData.encodedRefCopy = encodeRef('copy', refCopy.refId, options);
                }
                // Using copy refs only if it uses less bytes
                if (refData.encodedRefCopy && refData.encodedRefCopy.length < result.length) {
                    return refData.encodedRefCopy;
                }
            } else {
                context.refCopy.set(result, refData);
            }
        } else {
            context.refMap.delete(value);
        }
    }

    return result;
};
