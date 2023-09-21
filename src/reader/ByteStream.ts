
export interface IByteStreamOptions {
}

export default class ByteStream {

    protected _msg: string[];
    protected _msgArrIndex: number = 0;
    protected _msgChrIndex: number = 0;
    protected _restByte: number = 0;

    protected options: IByteStreamOptions;
    protected _isStreamComplete = false;
    protected _isEOF = false;

    protected _waitingPromise: Promise<void> | null = null;
    protected _waitingPromiseResolver: (() => void) | null = null;
    protected _waitingRejectTimeout: NodeJS.Timeout | number | null = null;

    constructor(msg: string | string[] = [], options: Partial<IByteStreamOptions> = {}) {
        this.options = {
            ...options,
        }
        this._msg = Array.isArray(msg) ? msg : [msg];
    }

    addMessage(msg: string | string[]) {
        if (Array.isArray(msg)) {
            this._msg.push(...msg);
        } else {
            this._msg.push(msg);
        }
    }

    completeStream(msg: string | string[] = []) {
        this.addMessage(msg);
        this._isStreamComplete = true;
    }

    isCompleteMessage(): boolean {
        return this._isStreamComplete;
    }

    isEOF(): boolean {
        return this._isEOF;
    }

    waitMessages(timeout: number): Promise<void> {
        if (this._waitingPromise) {
            return this._waitingPromise;
        }
        if (this._isStreamComplete) {
            return Promise.reject('Can not wait, stream is complete')
        }
        const promise = new Promise<void>((resolve, reject) => {
            this._waitingPromiseResolver = resolve;

            this._waitingRejectTimeout = setTimeout(() => {
                reject('Timeout riched');
            }, timeout);
        }).finally(() => {
            if (this._waitingRejectTimeout) {
                clearTimeout(this._waitingRejectTimeout);
                this._waitingRejectTimeout = null;
            }
            this._waitingPromise = null;
            this._waitingPromiseResolver = null;
        });

        this._waitingPromise = promise;
        return promise;
    }

    async readBytes(count: number = 1, timeout: number = 30_000): Promise<Uint8Array> {
        debugger;
        const uint8 = new Uint8Array(count);
        let uint8Len = 0;

        while (uint8Len < count) {
            if (this._restByte) {
                uint8[uint8Len] = this._restByte;
                this._restByte = 0;
                uint8Len += 1;
                continue;
            }

            if (!(this._msgArrIndex in this._msg)) {
                await this.waitMessages(timeout);
                continue;
            }

            const block = this._msg[this._msgArrIndex];
            let charCode = block.charCodeAt(this._msgChrIndex);
            if (charCode > 255) {
                this._restByte = (charCode & 0xFF00) >>> 8;
                charCode = charCode & 0xFF;
            }
            this._msgChrIndex += 1

            if (Number.isNaN(charCode)) {
                this._msgArrIndex += 1
                this._msgChrIndex = 0;
                continue;
            }

            uint8[uint8Len] = charCode;
            uint8Len += 1;
        }

        return uint8;
    }

}