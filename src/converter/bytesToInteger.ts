import { bytesToBigInt } from './bytesToBigInt'

export const bytesToInteger = (bytes: Uint8Array | number[]): number => {
    return Number(bytesToBigInt(bytes));
}
