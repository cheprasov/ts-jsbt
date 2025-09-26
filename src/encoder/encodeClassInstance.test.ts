import { expectAsBinaryString } from '../_tests/utils/expectAsBinaryString';
import { encodeClassInstance } from './encodeClassInstance';
import { createEncodeOptions } from './options/createEncodeOptions';

class User {

    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

}

class UserJSON {

    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    toJSON() {
        return {
            n: this._name,
            e: this._email,
        };
    }

}

class UserJSBT {

    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    toJSON() {
        return {
            n: this._name,
            e: this._email,
        };
    }

    toJSBT() {
        return {
            name: this._name,
            email: this._email,
        };
    }

}

class EmptyClass {}

class CustomUser {

    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    toJSBT() {
        return Object.defineProperty(
            {
                name: this._name,
                email: this._email,
            },
            '__jsbtConstructorName',
            {
                value: 'User',
                configurable: true,
                enumerable: false,
                writable: false,
            }
        );
    }

}

describe('encodeClassInstance', () => {
    it('should encode class instance correctly', () => {
        expectAsBinaryString(encodeClassInstance(new User('Alex', 'alex@email.com'), createEncodeOptions())).toEqual(
            '01111001 00000010 ' +
            // constructor name User
            '00010001 00000100 01010101 01110011 01100101 01110010 ' +
            // _name
            '00010001 00000101 01011111 01101110 01100001 01101101 01100101 ' +
            // Alex
            '00010001 00000100 01000001 01101100 01100101 01111000 ' +
            // _email'
            '00010001 00000110 01011111 01100101 01101101 01100001 01101001 01101100 ' +
            // alex@email.com
            '00010001 00001110 01100001 01101100 01100101 01111000 01000000 01100101 01101101 01100001 01101001 01101100 00101110 01100011 01101111 01101101'
        );

        expectAsBinaryString(
            encodeClassInstance(new UserJSON('Alex', 'alex@email.com'), createEncodeOptions())
        ).toEqual(
            '01111001 00000010 ' +
            // constructor name UserJSON
            '00010001 00001000 01010101 01110011 01100101 01110010 01001010 01010011 01001111 01001110 ' +
            // n
            '00010001 00000001 01101110 ' +
            // Alex
            '00010001 00000100 01000001 01101100 01100101 01111000 ' +
            // e'
            '00010001 00000001 01100101 ' +
            // alex@email.com
            '00010001 00001110 01100001 01101100 01100101 01111000 01000000 01100101 01101101 01100001 01101001 01101100 00101110 01100011 01101111 01101101'
        );

        expectAsBinaryString(
            encodeClassInstance(new UserJSBT('Alex', 'alex@email.com'), createEncodeOptions())
        ).toEqual(
            '01111001 00000010 ' +
            // constructor name UserJSBT
            '00010001 00001000 01010101 01110011 01100101 01110010 01001010 01010011 01000010 01010100 ' +
            // name
            '00010001 00000100 01101110 01100001 01101101 01100101 ' +
            // Alex
            '00010001 00000100 01000001 01101100 01100101 01111000 ' +
            // email'
            '00010001 00000101 01100101 01101101 01100001 01101001 01101100 ' +
            // alex@email.com
            '00010001 00001110 01100001 01101100 01100101 01111000 01000000 01100101 01101101 01100001 01101001 01101100 00101110 01100011 01101111 01101101'
        );

        expectAsBinaryString(
            encodeClassInstance(new EmptyClass(), createEncodeOptions())
        ).toEqual(
            '01111000 ' +
            // constructor name EmptyClass
            '00010001 00001010 01000101 01101101 01110000 01110100 01111001 01000011 01101100 01100001 01110011 01110011'
        );
    });

    it('should encode class instance with custom constructor name correctly', () => {
        expectAsBinaryString(
            encodeClassInstance(new CustomUser('Alex', 'alex@email.com'), createEncodeOptions())
        ).toEqual(
            '01111001 00000010 ' +
            // constructor name User
            '00010001 00000100 01010101 01110011 01100101 01110010 ' +
            // name
            '00010001 00000100 01101110 01100001 01101101 01100101 ' +
            // Alex
            '00010001 00000100 01000001 01101100 01100101 01111000 ' +
            // email'
            '00010001 00000101 01100101 01101101 01100001 01101001 01101100 ' +
            // alex@email.com
            '00010001 00001110 01100001 01101100 01100101 01111000 01000000 01100101 01101101 01100001 01101001 01101100 00101110 01100011 01101111 01101101'
        );
    });
});
