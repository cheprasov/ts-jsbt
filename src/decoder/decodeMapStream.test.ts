import { delaySender } from '../_tests/utils/delaySender';
import { encodeMap } from '../encoder/encodeMap';
import { createEncodeOptions } from '../encoder/options/createEncodeOptions';
import ByteStream from '../reader/ByteStream';
import { decodeMapStream } from './decodeMapStream';
import { createDecodeOptions } from './options/createDecodeOptions';

const options = createEncodeOptions();

describe('decodeMapStream', () => {
    it('should decode object correct', async () => {
        const decodeOptions = createDecodeOptions();
        const stream = new ByteStream();
        delaySender(stream, [
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

        expect(await decodeMapStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new Map<any, any>([
                ['foo', 42],
                ['foo', 'bar'],
                [44, 10],
            ])
        );
        expect(await decodeMapStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(new Map());
        expect(await decodeMapStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
            new Map<any, any>([
                ['foo', 42],
                ['bar', null],
                ['baz', true],
            ])
        );
        expect(await decodeMapStream(await stream.readStreamByte(), stream, decodeOptions)).toEqual(
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
