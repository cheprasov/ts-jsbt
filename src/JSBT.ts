import { decode } from './decoder/decode';
import { decodeStream } from './decoder/decodeStream';
import { createDecodeOptions } from './decoder/options/createDecodeOptions';
import { encode } from './encoder/encode';
import { createEncodeOptions } from './encoder/options/createEncodeOptions';
import ByteStream from './reader/ByteStream';

export class JSBT {

    static encode(value: any): string {
        const options = createEncodeOptions();
        options.refs = {
            enabled: true,
        };
        return encode(value, options);
    }

    static decode<T = any>(value: string | string[] | number[]): T {
        const stream = new ByteStream(value);
        stream.completeStream();
        const options = createDecodeOptions();
        options.context.readBytes = stream.getReadBytes();
        return decode(null, stream, options) as T;
    }

    static async decodeStream<T = any>(stream: ByteStream): Promise<T> {
        const options = createDecodeOptions();
        options.context.readBytes = stream.getReadBytes();
        return decodeStream(null, stream, options) as Promise<T>;
    }

}
