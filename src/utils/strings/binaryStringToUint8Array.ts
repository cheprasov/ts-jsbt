export const binaryStringToUint8Array = (str: string): Uint8Array => {
    const len = str.length;
    const bytes: number[] = [];

    for (let i = 0; i < len; i++) {
        const chr = str[i];
        for (let codeAt = 0; codeAt < 2; codeAt += 1) {
            const code = chr.charCodeAt(codeAt);
            if (isNaN(code)) {
                continue;
            }
            if (code < 256) {
                bytes.push(code & 0xff);
            } else {
                const code1 = (code & 0xff00) >> 8;
                const code2 = code & 0xff;
                bytes.push(code1);
                bytes.push(code2);
            }
        }
    }

    return new Uint8Array(bytes);
};

export const utf16StringToUint8ArrayLE = (str: string): Uint8Array => {
    const out = new Uint8Array(str.length * 2);
    let o = 0;
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i); // 0..65535
        out[o++] = code & 0xff; // low byte
        out[o++] = (code >>> 8) & 0xff; // high byte
    }
    return out;
};
