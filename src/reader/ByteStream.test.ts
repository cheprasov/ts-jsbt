import { bytesToUtf16 } from '../converter/bytesToUtf16';
import ByteStream from './ByteStream';

describe('ByteStream', () => {
    it('should read stream data correct', async () => {
        const stream = new ByteStream(['🇬🇧']);
        stream.completeStream();
        expect(await stream.readStreamBytes(8)).toEqual(Uint8Array.from([60, 216, 236, 221, 60, 216, 231, 221]));
    });

    it('should read stream data correct', async () => {
        const stream = new ByteStream(['Alex', '', '🇬🇧', 'I💖JS']);
        stream.completeStream();
        expect(await stream.readStreamBytes(3)).toEqual(Uint8Array.from([65, 108, 101]));
        expect(await stream.readStreamBytes(3)).toEqual(Uint8Array.from([120, 60, 216]));
        expect(await stream.readStreamBytes(3)).toEqual(Uint8Array.from([236, 221, 60]));
        expect(await stream.readStreamBytes(3)).toEqual(Uint8Array.from([216, 231, 221]));
        expect(await stream.readStreamBytes(3)).toEqual(Uint8Array.from([73, 61, 216]));
        expect(await stream.readStreamBytes(3)).toEqual(Uint8Array.from([150, 220, 74]));
        expect(await stream.readStreamBytes(1)).toEqual(Uint8Array.from([83]));
    });

    it('should read stream data correct', async () => {
        const stream = new ByteStream(['Alex', '', '🇬🇧', 'I💖JS']);
        stream.completeStream();
        const bytes = await stream.readStreamBytes(19);
        expect(bytesToUtf16(bytes)).toEqual('Alex🇬🇧I💖JS');
    });

    it('should return only availiable bytes and mark as EOF for completed stream', async () => {
        const stream = new ByteStream(['Alex']);
        stream.completeStream();
        const bytes = await stream.readStreamBytes(20);
        expect(bytes.byteLength).toEqual(4);
        expect(stream.isEOF).toBeTruthy();
        expect(bytesToUtf16(bytes)).toEqual('Alex');
    });

    it('should throw error on waiting timeout', async () => {
        const stream = new ByteStream(['Alex']);
        await expect(async () => {
            await stream.readStreamBytes(5, 1000);
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
        expect(await stream.readStreamBytes(7, 1000)).toEqual(new Uint8Array([65, 108, 101, 120, 32, 52, 50]));
    });

    it('should read bytes correct', () => {
        const stream = new ByteStream(['Alex', '', '🇬🇧', 'I💖JS']);
        stream.completeStream();
        expect(stream.readBytes(3)).toEqual(Uint8Array.from([65, 108, 101]));
        expect(stream.readBytes(3)).toEqual(Uint8Array.from([120, 60, 216]));
        expect(stream.readBytes(3)).toEqual(Uint8Array.from([236, 221, 60]));
        expect(stream.readBytes(3)).toEqual(Uint8Array.from([216, 231, 221]));
        expect(stream.readBytes(3)).toEqual(Uint8Array.from([73, 61, 216]));
        expect(stream.readBytes(3)).toEqual(Uint8Array.from([150, 220, 74]));
        expect(stream.readBytes(1)).toEqual(Uint8Array.from([83]));
    });

    it('should throw error on reading bytes for uncomplete stream', () => {
        const stream = new ByteStream(['Alex', '', '🇬🇧', 'I💖JS']);
        expect(() => {
            stream.readBytes(3);
        }).toThrowError('Sync bytes read is allowed only for completed stream')
    });

    it('should throw error on trying to read unavaliable bytes', () => {
        const stream = new ByteStream(['Alex']);
        stream.completeStream();
        expect(() => {
            const bytes = stream.readBytes(20);
        }).toThrowError('Can not read 16 bytes')
    });

});
