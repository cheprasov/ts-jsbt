export const getBytesSizeForString = (str: string) => {
    // returns the byte length of an utf8 string
    let size = str.length;
    for (let i = str.length - 1; i >= 0; i -= 1) {
        const code = str.charCodeAt(i);
        if (code > 0x7F && code <= 0x7FF) {
            size += 1;
        } else if (code > 0x7FF && code <= 0xFFFF) {
            size += 2;
        }
        if (code >= 0xDC00 && code <= 0xDFFF) {
            i -= 1; // trail surrogate
        }
    }
    return size;
}
