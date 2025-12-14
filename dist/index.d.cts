declare class ByteStream {
    protected _msg: (string | number)[];
    protected _msgArrIndex: number;
    protected _msgChrIndex: number;
    protected _restByte: number;
    protected _isStreamComplete: boolean;
    protected _isEOF: boolean;
    protected _waitingPromise: Promise<void> | null;
    protected _waitingPromiseResolver: (() => void) | null;
    protected _waitingRejectTimeout: NodeJS.Timeout | number | null;
    protected _readBytes: number[];
    constructor(msg?: string | string[] | number[]);
    getReadBytesIndex(): number;
    getReadBytes(): Readonly<number[]>;
    addMessage(msg: string | string[] | number[]): void;
    completeStream(msg?: string | string[] | number[]): void;
    isCompleteMessage(): boolean;
    isEOF(): boolean;
    waitMessages(timeout: number): Promise<void>;
    readStreamBytes(count?: number, timeout?: number): Promise<Uint8Array>;
    readStreamByte(): Promise<number>;
    readBytes(count?: number): Uint8Array;
    readByte(): number;
}

type TDecodeClassConstructor<T extends object> = new (...args: any[]) => T;

declare class JSBT {
    protected static _classFactories: Record<string, TDecodeClassConstructor<object>>;
    static setClassFactories(factories: Record<string, TDecodeClassConstructor<object>>): void;
    static encode(value: any): string;
    static decode<T = any>(value: string | string[] | number[]): T;
    static decodeStream<T = any>(stream: ByteStream): Promise<T>;
}

export { ByteStream, JSBT };
