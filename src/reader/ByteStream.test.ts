import { bytesToUtf16 } from '../converter/bytesToUtf16';
import ByteStream from './ByteStream';

describe('ByteStream', () => {
    it('should read correct data', async () => {
        const stream = new ByteStream(['🇬🇧']);
        stream.completeStream();
        expect(await stream.readBytes(8)).toEqual(Uint8Array.from([60, 216, 236, 221, 60, 216, 231, 221]));
    });

    it('should read correct data', async () => {
        const stream = new ByteStream(['Alex', '', '🇬🇧', 'I💖JS']);
        stream.completeStream();
        expect(await stream.readBytes(3)).toEqual(Uint8Array.from([65, 108, 101]));
        expect(await stream.readBytes(3)).toEqual(Uint8Array.from([120, 60, 216]));
        expect(await stream.readBytes(3)).toEqual(Uint8Array.from([236, 221, 60]));
        expect(await stream.readBytes(3)).toEqual(Uint8Array.from([216, 231, 221]));
        expect(await stream.readBytes(3)).toEqual(Uint8Array.from([73, 61, 216]));
        expect(await stream.readBytes(3)).toEqual(Uint8Array.from([150, 220, 74]));
        expect(await stream.readBytes(1)).toEqual(Uint8Array.from([83]));
    });

    it('should read correct data', async () => {
        const stream = new ByteStream(['Alex', '', '🇬🇧', 'I💖JS']);
        stream.completeStream();
        const bytes = await stream.readBytes(19);
        const msg: string[] = [];
        bytes.forEach((c: number) => {
            msg.push(String.fromCharCode(c))
        });
        expect(bytesToUtf16(bytes)).toEqual('Alex🇬🇧I💖JS');
    });

    it('should throw error on reading more bytes for completed stream', async () => {
        const stream = new ByteStream(['Alex']);
        stream.completeStream();
        await expect(async () => {
            await stream.readBytes(5);
        }).rejects.toEqual('Can not wait completed stream');
    });

    it('should throw error on waiting timeout', async () => {
        const stream = new ByteStream(['Alex']);
        await expect(async () => {
            await stream.readBytes(5, 1000);
        }).rejects.toEqual('Waiting timeout 1000ms is riched');
    });

    it('should read well bytes after waiting', async () => {
        const stream = new ByteStream(['Alex']);
        setTimeout(() => {
            stream.addMessage(' 4');
        }, 600);
        setTimeout(() => {
            stream.addMessage('2');
        }, 1200);
        expect(await stream.readBytes(7, 1000)).toEqual(new Uint8Array([65, 108, 101, 120, 32, 52, 50]));
    });
});
