
export interface IDataWriter {

    pushByte(byte: number): void;

    pushBytes(bytes: number[] | Uint8Array): void;

    size(): number;

}
