//export type TClassMethod<T, M extends keyof T = keyof T> = T[M] extends Function ? T[M] : never;
export type TClassMethod<T> =
{ [K in keyof T as T[K] extends typeof Function ? K : never]: T[K] }
