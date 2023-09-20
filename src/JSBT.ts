import { encode } from './encoder/encode';
import { createEncodeOptions } from './encoder/options/createEncodeOptions';


export class JSBT {
    static encode(value: any): string {
        const options = createEncodeOptions();
        const result = encode(value, options);
        return result;
    }

    static decode<T = any>(value: string): T {
        return '' as T;
    }
}
