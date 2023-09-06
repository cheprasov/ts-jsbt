import { stringToBinaryString } from '../../converter/stringToBinaryString';

export const expectAsBinaryString = (expected: string, sepByte: string = ' ', sepUtf16: string = '') => {
    return expect(stringToBinaryString(expected, sepByte, sepUtf16));
}