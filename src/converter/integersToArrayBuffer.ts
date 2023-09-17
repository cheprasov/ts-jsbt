
export const integersToArrayBuffer = (ints: number[]): ArrayBuffer => {
    return new Uint8Array(ints).buffer;
};