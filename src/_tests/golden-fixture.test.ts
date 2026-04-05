import { readFileSync } from 'fs';
import { resolve } from 'path';
import { decodeBase64 } from './utils/decodeBase64';
import { buildJSBTGoldenFixture, Foo } from './utils/buildJSBTGoldenFixture';
import { JSBT } from '../JSBT';
import { encodeBase64 } from './utils/encodeBase64';

interface IVersionPayload {
    version: string;
    desc: string;
    payload: string;
}

describe('JSBT Golden Fixture Test', () => {
    let payloadGoldenFixture: string = '';
    let payloads64: string = '';
    let versionPayloads: IVersionPayload[] = [];

    beforeAll(() => {
        JSBT.setClassFactories({ Foo });
        payloadGoldenFixture = JSBT.encode(buildJSBTGoldenFixture());
        // console.log('pagoldenFixture data', (payloadGoldenFixture));
        // console.log('pagoldenFixture base64', encodeBase64(payloadGoldenFixture));

        payloads64 = readFileSync(resolve(__dirname, './golden-fixture-payloads64.txt'), { encoding: 'binary' });
        expect(payloads64.length).toBeGreaterThan(0);

        payloads64.split(/\n+/).forEach((line) => {
            line = line.trim();
            if (!line) {
                return;
            }
            const [version, desc, payload64] = line.split('|', 3);
            const ver: IVersionPayload = {
                version: version.trim(),
                desc: desc.trim(),
                payload: decodeBase64(payload64.trim()),
            };
            versionPayloads.push(ver);
        });
        expect(versionPayloads.length).toBeGreaterThan(0);
    });

    it('Encode and decode golden fixture', () => {
        versionPayloads.forEach((v) => {
            expect(JSBT.encode(buildJSBTGoldenFixture())).toStrictEqual(JSBT.encode(buildJSBTGoldenFixture()));
            expect(payloadGoldenFixture).toStrictEqual(JSBT.encode(buildJSBTGoldenFixture()));
        });
    });

    it('Encode and decode saved payloads', () => {
        versionPayloads.forEach((v) => {
            const decodedData = JSBT.decode(v.payload);
            const encodedPaylaod = JSBT.encode(decodedData);
            expect(encodedPaylaod).toStrictEqual(payloadGoldenFixture);
        });
    });
});
