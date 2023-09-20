
interface IRefData {
    count: number,
}

export const calculateRefs = (
    value: any,
    refMap: Map<any, IRefData> = new Map(),
    topLevel: boolean = true
): any[] => {

    const refData = refMap.get(value);
    if (refData) {
        refData.count += 1;
    }

    let isRefAllowed = false;

    const type = typeof value;
    switch (type) {
        case 'undefined': {
            isRefAllowed = false;
            break;
        }
        case 'boolean': {
            isRefAllowed = false;
            break;
        }
        case 'number': {
            if (isInteger(value)) {
                isRefAllowed = value > 255 || value < -255;
                break;
            }
            if (isFloat(value)) {
                isRefAllowed = true;
                break;
            }
            if (Number.isNaN(value)) {
                isRefAllowed = true;
                break;
            }
            if (value === Infinity || value === -Infinity) {
                isRefAllowed = true;
                break;
            }
            break;
        }
        case 'string': {
            isRefAllowed = value.length > 2;
            break;
        }
        case 'object': {
            if (value === null) {
                isRefAllowed = false;
                break;
            }
            if (Array.isArray(value)) {
                isRefAllowed = true;
                break;
            }
            if (isObject(value)) {
                isRefAllowed = true;
                break;
            }
            if (isSet(value)) {
                isRefAllowed = true;
                break;
            }
            if (isMap(value)) {
                isRefAllowed = true;
                break;
            }
            if (isTypedArray(value)) {
                isRefAllowed = true;
                break;
            }
            break;
        }
        case 'bigint': {
            isRefAllowed = true;
            break;
        }
        case 'symbol': {
            isRefAllowed = true;
            break;
        }
    }

    if (result === null) {
        throw new Error(`Unsupported encoding value: "${value}", type: "${type}"`);
    }

    if (isRefAllowed) {
        context.refMap.set(va)
    }
}
};
