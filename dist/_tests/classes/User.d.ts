export declare class User {
    protected _name: string;
    protected _email: string;
    constructor(name: string, email: string);
    toJSBT(): {
        name: string;
        email: string;
    };
    toJSON(): {
        n: string;
        e: string;
    };
}
