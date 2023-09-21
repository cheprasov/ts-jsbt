export default class ByteStream {

    protected _msg: string[];
    protected _msgArrIndex: number = 0;
    protected _msgChrIndex: number = 0;
    protected _restByte: number = 0;

    protected _isStreamComplete = false;

    protected _waitingPromise: Promise<void> | null = null;
    protected _waitingPromiseResolver: (() => void) | null = null;
    protected _waitingRejectTimeout: NodeJS.Timeout | number | null = null;

    constructor(msg: string | string[] = []) {
        this._msg = Array.isArray(msg) ? msg : [msg];
    }

    addMessage(msg: string | string[]) {
        if (Array.isArray(msg)) {
            this._msg.push(...msg);
        } else {
            this._msg.push(msg);
        }
        if (this._waitingPromise && this._waitingPromiseResolver) {
            this._waitingPromiseResolver();
        }
    }

    completeStream(msg: string | string[] = []) {
        this.addMessage(msg);
        this._isStreamComplete = true;
    }

    isCompleteMessage(): boolean {
        return this._isStreamComplete;
    }

    waitMessages(timeout: number): Promise<void> {
        if (this._waitingPromise) {
            return this._waitingPromise;
        }
        if (this._isStreamComplete) {
            return Promise.reject('Can not wait completed stream');
        }
        const promise = new Promise<void>((resolve, reject) => {
            this._waitingPromiseResolver = resolve;

            this._waitingRejectTimeout = setTimeout(() => {
                reject(`Waiting timeout ${timeout}ms is riched`);
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
                this._restByte = (charCode & 0xff00) >>> 8;
                charCode = charCode & 0xff;
            }
            this._msgChrIndex += 1;

            if (Number.isNaN(charCode)) {
                this._msgArrIndex += 1;
                this._msgChrIndex = 0;
                continue;
            }

            uint8[uint8Len] = charCode;
            uint8Len += 1;
        }

        return uint8;
    }

}
