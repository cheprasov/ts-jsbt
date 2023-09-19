
export const isMap = (value: any): value is Map<any, any> => {
    return value instanceof Map;
}
