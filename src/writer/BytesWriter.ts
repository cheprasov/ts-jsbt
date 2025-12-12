import { IDataWriter } from './IDataWriter';

export class BytesWriter implements IDataWriter {

    protected _buffer = new Uint8Array(1024);
    protected _offset = 0;

    protected ensure(size: number) {
        if (this._offset + size <= this._buffer.length) return;
        const next = new Uint8Array(this._buffer.length * 2 + size);
        next.set(this._buffer);
        this._buffer = next;
    }

    pushByte(byte: number) {
        this.ensure(1);
        this._buffer[this._offset] = byte & 0xff;
        this._offset += 1;
    }

    pushBytes(bytes: number[] | Uint8Array) {
        this.ensure(bytes.length);
        this._buffer.set(bytes, this._offset);
        this._offset += bytes.length;
    }

    size(): number {
        return this._offset;
    }

    finish(): Uint8Array {
        return this._buffer.subarray(0, this._offset);
    }

}
