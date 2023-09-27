import { TTypedArray } from '../../types/TTypedArray';
interface IResults {
    envValueSize: number;
    encKeyValueSize: number;
}
export declare const calculateByteCountVariants: (tarr: TTypedArray | ArrayBuffer) => IResults;
export {};
