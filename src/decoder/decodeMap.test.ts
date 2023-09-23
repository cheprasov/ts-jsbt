import { encodeMap } from '../encoder/encodeMap';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { IDecodeOptions } from '../types/IDecodeOptions';
import { decodeMap } from './decodeMap';

const options = createEncodeOptions();
const decodeOptions = {
    context: {},
} as IDecodeOptions;

describe('decodeMap', () => {
    it('should decode object correct', () => {
        const stream = new ByteStream([
            encodeMap(
                new Map<any, any>([
                    ['foo', 42],
                    ['foo', 'bar'],
                    [44, 10],
                ]),
                options
            ),
            encodeMap(new Map(), options),
            encodeMap(
                new Map<any, any>([
                    ['foo', 42],
                    ['bar', null],
                    ['baz', true],
                ]),
                options
            ),
            encodeMap(
                new Map<any, any>([
                    [
                        'foo',
                        new Map<any, any>([
                            ['bar', 42],
                            ['baz', new Map<any, any>([['foo', 43]])],
                        ]),
                    ],
                ]),
                options
            ),
        ]);
        stream.completeStream();

        expect(decodeMap(stream.readByte(), stream, decodeOptions)).toEqual(
            new Map<any, any>([
                ['foo', 42],
                ['foo', 'bar'],
                [44, 10],
            ])
        );
        expect(decodeMap(stream.readByte(), stream, decodeOptions)).toEqual(new Map());
        expect(decodeMap(stream.readByte(), stream, decodeOptions)).toEqual(
            new Map<any, any>([
                ['foo', 42],
                ['bar', null],
                ['baz', true],
            ])
        );
        expect(decodeMap(stream.readByte(), stream, decodeOptions)).toEqual(
            new Map<any, any>([
                [
                    'foo',
                    new Map<any, any>([
                        ['bar', 42],
                        ['baz', new Map<any, any>([['foo', 43]])],
                    ]),
                ],
            ])
        );
    });
});
