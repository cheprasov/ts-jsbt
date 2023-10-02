export const getBytesSizeForString = (str: string) => {
    let size = 0;

    for (let i = 0; i < str.length; i += 1) {
        const chr = str[i];
        for (let codeAt = 0; codeAt < 2; codeAt += 1) {
            const code = chr.charCodeAt(codeAt);
            if (isNaN(code)) {
                continue;
            }
            if (code < 256) {
                size += 1;
            } else {
                size += 2;
            }
        }
    }
    return size;
}
