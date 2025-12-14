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

export const encode = (value: any, options: IEncodeOptions): number => {
    const offset = options.writer.getOffset();
    let newOffset: number = 0;
    const context = options.context;
    const isRefEnabled = options.refs?.enabled || false;

    let refData: IRefData | null = null;
    if (isRefEnabled) {
        refData = context.refMap.get(value) || null;
        if (refData) {
            if (!refData.encodedRefLink) {
                newOffset = encodeRef('link', refData.refId, options.writer);
                refData.encodedRefLink = options.writer.getSubBytes(offset);
                return options.writer.getOffset();
            }
            return options.writer.pushBytes(refData.encodedRefLink);
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

    let isRefAllowed: boolean = false;

    const type = typeof value;
    switch (type) {
        case 'undefined': {
            isRefAllowed = false;
            newOffset = encodeUndefined(options.writer);
            break;
        }
        case 'boolean': {
            isRefAllowed = false;
            newOffset = encodeBoolean(value, options.writer);
            break;
        }
        case 'number': {
            if (isInteger(value)) {
                isRefAllowed = value > 255 || value < -255;
                newOffset = encodeInteger(value, options.writer);
                break;
            }
            if (isFloat(value)) {
                isRefAllowed = true;
                newOffset = encodeFloat(value, options.writer);
                break;
            }
            if (Number.isNaN(value)) {
                isRefAllowed = false;
                newOffset = encodeNaN(options.writer);
                break;
            }
            if (value === Infinity || value === -Infinity) {
                isRefAllowed = false;
                newOffset = encodeInfinity(value, options.writer);
                break;
            }
            break;
        }
        case 'string': {
            isRefAllowed = value.length > 2;
            newOffset = encodeString(value, options.writer);
            break;
        }
        case 'object': {
            if (value === null) {
                isRefAllowed = false;
                newOffset = encodeNull(options.writer);
                break;
            }
            if (Array.isArray(value)) {
                isRefAllowed = true;
                newOffset = encodeArray(value, options);
                break;
            }
            if (isObject(value)) {
                isRefAllowed = true;
                newOffset = encodeObject(value, options);
                break;
            }
            if (isSet(value)) {
                isRefAllowed = true;
                newOffset = encodeSet(value, options);
                break;
            }
            if (isMap(value)) {
                isRefAllowed = true;
                newOffset = encodeMap(value, options);
                break;
            }
            if (isTypedArray(value)) {
                isRefAllowed = true;
                newOffset = encodeTypedArray(value, options.writer);
                break;
            }
            if (value instanceof Date) {
                isRefAllowed = Math.abs(value.getTime()) > 255; // BUG ?!
                newOffset = encodeDate(value, options.writer);
                break;
            }
            if (isPrimitiveObjectWrapper(value)) {
                isRefAllowed = true;
                newOffset = encodePrimitiveObjectWrapper(value, options);
                break;
            }
            if (isClassInstance(value)) {
                isRefAllowed = true;
                newOffset = encodeClassInstance(value, options);
                break;
            }
            break;
        }
        case 'bigint': {
            isRefAllowed = true;
            newOffset = encodeBigInt(value, options.writer);
            break;
        }
        case 'symbol': {
            isRefAllowed = true;
            newOffset = encodeSymbol(value, options.writer);
            break;
        }
    }

    if (newOffset === offset) {
        throw new Error(`Unsupported encoding value: "${value}", type: "${type}"`);
    }

    if (refData) {
        if (isRefAllowed) {
            const uint8a = options.writer.getSubBytes(offset);
            const refCopy = context.refCopy.get(uint8a);
            if (refCopy) {
                if (!refData.encodedRefCopy) {
                    options.writer.setOffset(offset);
                    encodeRef('copy', refCopy.refId, options.writer);
                    refData.encodedRefCopy = options.writer.getSubBytes(newOffset);
                    return options.writer.getOffset();
                }
                return options.writer.pushBytes(refData.encodedRefCopy);
            } else {
                context.refCopy.set(uint8a, refData);
            }
        } else {
            context.refMap.delete(value);
        }
    }

    return newOffset;
};
