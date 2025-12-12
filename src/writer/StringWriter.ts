import { IDataWriter } from './IDataWriter';

export class StringWriter implements IDataWriter {

    protected _chunks: string[] = [];

    pushByte(byte: number) {
        this._chunks.push(String.fromCharCode(byte));
    }

    pushBytes(bytes: number[]) {
        this._chunks.push(String.fromCharCode(...bytes));
    }

    size(): number {
        return this._chunks.length;
    }

    finish(): string {
        return this._chunks.join('');
    }

}
