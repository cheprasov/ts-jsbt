export default class ByteStream {

    protected _msg: string[];
    protected _msgArrIndex: number = 0;
    protected _msgChrIndex: number = 0;
    protected _restByte: number = 0;

    protected _isStreamComplete = false;
    protected _isEOF = false;

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

    isEOF(): boolean {
        return this._isEOF;
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

    async readStreamBytes(count: number = 1, timeout: number = 30_000): Promise<Uint8Array> {
        const bytes = new Uint8Array(count);
        let bytesLen = 0;

        while (bytesLen < count) {
            if (this._restByte) {
                bytes[bytesLen] = this._restByte;
                this._restByte = 0;
                bytesLen += 1;
                continue;
            }

            if (!(this._msgArrIndex in this._msg)) {
                if (!this._isStreamComplete) {
                    await this.waitMessages(timeout);
                    continue;
                }
                this._isEOF = true;
                return bytes.slice(0, bytesLen);
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

            bytes[bytesLen] = charCode;
            bytesLen += 1;
        }

        return bytes;
    }

    readBytes(count: number = 1): Uint8Array {
        if (!this._isStreamComplete) {
            throw new Error('Sync bytes read is allowed only for completed stream');
        }
        const bytes = new Uint8Array(count);
        let bytesLen = 0;

        while (bytesLen < count) {
            if (this._restByte) {
                bytes[bytesLen] = this._restByte;
                this._restByte = 0;
                bytesLen += 1;
                continue;
            }

            if (!(this._msgArrIndex in this._msg)) {
                this._isEOF = true;
                return bytes.slice(0, bytesLen);
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

            bytes[bytesLen] = charCode;
            bytesLen += 1;
        }

        return bytes;
    }

}
