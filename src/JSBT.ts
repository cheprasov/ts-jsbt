import { encodeArray } from './encoder/encodeArray';
import { encodeBoolean } from './encoder/encodeBoolean';
import { encodeFloat } from './encoder/encodeFloat';
import { encodeInfinity } from './encoder/encodeInfinity';
import { encodeInteger } from './encoder/encodeInteger';
import { encodeNaN } from './encoder/encodeNaN';
import { encodeNull } from './encoder/encodeNull';
import { encodeObject } from './encoder/encodeObject';
import { encodeSet } from './encoder/encodeSet';
import { encodeString } from './encoder/encodeString';
import { encodeTypedArray } from './encoder/encodeTypedArray';
import { encodeUndefined } from './encoder/encodeUndefined';
import { IEncodeOptions } from './types/IEncodeOptions';
import { isFloat } from './utils/vars/isFloat';
import { isInteger } from './utils/vars/isInteger';
import { isObject } from './utils/vars/isObject';
import { isSet } from './utils/vars/isSet';
import { isTypedArray } from './utils/vars/isTypedArray';

export class JSBT {

    static encode(value: any, options?: IEncodeOptions): string {
        const type = typeof value;
        switch (type) {
            case 'undefined': {
                return encodeUndefined();
            }
            case 'boolean': {
                return encodeBoolean(value);
            }
            case 'number': {
                if (isInteger(value)) {
                    return encodeInteger(value);
                }
                if (isFloat(value)) {
                    return encodeFloat(value);
                }
                if (Number.isNaN(value)) {
                    return encodeNaN();
                }
                if (value === Infinity || value === -Infinity) {
                    return encodeInfinity(value);
                }
                break;
            }
            case 'string': {
                return encodeString(value);
            }
            case 'object': {
                if (value === null) {
                    return encodeNull();
                }
                if (Array.isArray(value)) {
                    return encodeArray(value, options);
                }
                if (isObject(value)) {
                    return encodeObject(value, options);
                }
                if (isSet(value)) {
                    return encodeSet(value, options);
                }
                if (isTypedArray(value)) {
                    return encodeTypedArray(value, options);
                }
                break;
            }
        }

        throw new Error(`Unsupported encoding value: "${value}", type: "${type}"`);
    }

    static decode<T = any>(value: string): T {
        return '' as T;
    }
}
