
export const bytesToUtf16 = (bytes: Uint8Array | number[]): string => {
    const msg: string[] = [];
    const len = Array.isArray(bytes) ? bytes.length : bytes.byteLength;

    for (let i = 0; i < len; i += 1) {
        // trailing bytes
        const currentByte = bytes[i];
        const nextByte = bytes[i + 1];
        // leading bytes
        if (
            nextByte >= 0xD8 && nextByte <= 0xDB // leading bytes
            || nextByte >= 0xDC && nextByte <= 0xDF // trailing bytes
        ) {
            msg.push(String.fromCharCode((nextByte << 8) | currentByte));
            i += 1;
            continue;
        }
        msg.push(String.fromCharCode(currentByte));
    }
    return msg.join('');
}