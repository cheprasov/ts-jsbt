import { decode } from './decoder/decode';
import { decodeStream } from './decoder/decodeStream';
import { createDecodeOptions } from './decoder/options/createDecodeOptions';
import { encode } from './encoder/encode';
import { createEncodeOptions } from './encoder/options/createEncodeOptions';
import ByteStream from './reader/ByteStream';
import { TDecodeClassConstructor } from './types/IDecodeOptions';

export class JSBT {

    protected static _classFactories: Record<string, TDecodeClassConstructor<object>> = {};

    static setClassFactories(factories: Record<string, TDecodeClassConstructor<object>>): void {
        this._classFactories = factories;
    }

    static encode(value: any): string {
        const options = createEncodeOptions();
        options.refs = {
            enabled: true,
        };
        const result = encode(value, options);
        return result;
    }

    static decode<T = any>(value: string | string[] | number[]): T {
        const stream = new ByteStream(value);
        stream.completeStream();
        const options = createDecodeOptions();
        options.objects.factories = this._classFactories;
        options.context.readBytes = stream.getReadBytes();
        const result = decode(null, stream, options) as T;
        return result;
    }

    static async decodeStream<T = any>(stream: ByteStream): Promise<T> {
        const options = createDecodeOptions();
        options.objects.factories = this._classFactories;
        options.context.readBytes = stream.getReadBytes();
        const result = decodeStream(null, stream, options) as Promise<T>;
        return result;
    }

}
