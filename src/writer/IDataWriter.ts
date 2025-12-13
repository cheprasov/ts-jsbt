
export interface IDataWriter {

    pushByte(byte: number): number;

    pushBytes(bytes: number[] | Uint8Array): number;

    getSubBytes(offset: number, size: number): Readonly<Uint8Array>;

    getOffset(): number;

}
