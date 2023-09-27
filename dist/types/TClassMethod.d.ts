export type TClassMethod<T> = {
    [K in keyof T as T[K] extends Function ? K : never]: T[K];
};
