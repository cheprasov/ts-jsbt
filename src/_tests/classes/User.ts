export class User {

    protected _name: string;
    protected _email: string;

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    toJSBT() {
        return {
            name: this._name,
            email: this._email,
        };
    }

    toJSON() {
        return {
            n: this._name,
            e: this._email,
        };
    }

}
