import { IDataWriter } from './IDataWriter';

const CHUNK = 0x8000; // 32k

export class BytesWriter implements IDataWriter {

    protected _buffer = new Uint8Array(1024);
    protected _offset = 0;

    protected ensure(size: number) {
        if (this._offset + size <= this._buffer.length) return;
        const next = new Uint8Array(this._buffer.length * 2 + size);
        next.set(this._buffer);
        this._buffer = next;
    }

    pushByte(byte: number): number {
        this.ensure(1);
        this._buffer[this._offset] = byte & 0xff;
        this._offset += 1;
        return this._offset;
    }

    pushBytes(bytes: number[] | Uint8Array): number {
        this.ensure(bytes.length);
        this._buffer.set(bytes, this._offset);
        this._offset += bytes.length;
        return this._offset;
    }

    getSubBytes(offset: number, size: number = 0): Readonly<Uint8Array> {
        if (offset >= this._offset) return new Uint8Array(0);
        const end = size > 0 ? Math.min(offset + size, this._offset) : this._offset;
        return this._buffer.subarray(offset, end);
    }

    getOffset(): number {
        return this._offset;
    }

    setOffset(offset: number) {
        this._offset = offset;
    }

    finish(): Uint8Array {
        return this._buffer.subarray(0, this._offset);
    }

    toString(): string {
        let result = '';
        const bytes = this.finish();
        for (let i = 0; i < bytes.length; i += CHUNK) {
            result += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
        }
        return result;
    }

}
