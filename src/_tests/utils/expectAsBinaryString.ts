import { stringToBinaryString } from '../../converter/stringToBinaryString';

export const expectAsBinaryString = (expected: string) => {
    return expect(stringToBinaryString(expected));
}