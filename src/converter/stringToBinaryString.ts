export const stringToBinaryString = (str: string, sepByte: string = '', sepUtf16: string = ''): string => {
    const binaryStrings: string[] = [];

    for (let i = 0; i < str.length; i += 1) {
        const chr = str[i];
        for (let codeAt = 0; codeAt < 2; codeAt += 1) {
            const code = chr.charCodeAt(codeAt);
            if (isNaN(code)) {
                continue;
            }
            if (code < 256) {
                binaryStrings.push(code.toString(2).padStart(8, '0'));
            } else {
                const code1 = (code & 0xff00) >> 8;
                const code2 = code & 0xff;
                binaryStrings.push(
                    code1.toString(2).padStart(8, '0') + (sepUtf16 || sepByte) + code2.toString(2).padStart(8, '0')
                );
            }
        }
    }

    return binaryStrings.join(sepByte);
};
