const FNV_OFFSET_64 = 14695981039346656037n;
const FNV_PRIME_64 = 1099511628211n;

export function hashBytes64(bytes: Uint8Array): bigint {
    let h = FNV_OFFSET_64;
    for (let i = 0; i < bytes.length; i += 1) {
        h ^= BigInt(bytes[i]);
        h = (h * FNV_PRIME_64) & 0xffffffffffffffffn; // keep 64-bit
    }
    return h;
}

export const fnv1a32 = (bytes: Uint8Array): number => {
    let h = 0x811c9dc5; // offset basis 32
    for (let i = 0; i < bytes.length; i++) {
        h ^= bytes[i];
        h = Math.imul(h, 0x01000193); // FNV prime 32
    }
    return h >>> 0;
};

export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

type Entry<T> = { bytes: Uint8Array; data: T };

export class ByteInternMap<T> {

    protected _map = new Map<number, Entry<T>[]>();

    get(bytes: Uint8Array): T | undefined {
        const h = fnv1a32(bytes);
        const bucket = this._map.get(h);
        if (!bucket) return undefined;
        if (bucket.length > 1) {
            console.log('bucket.length', bucket.length);
        }
        for (const e of bucket) {
            if (bytesEqual(e.bytes, bytes)) return e.data;
        }
        return undefined;
    }

    set(bytes: Uint8Array, data: T) {
        const h = fnv1a32(bytes);
        const bucket = this._map.get(h);
        if (!bucket) {
            this._map.set(h, [{ bytes, data }]);
            return;
        }
        // avoid duplicates if called twice
        for (const e of bucket) {
            if (bytesEqual(e.bytes, bytes)) {
                e.data = data;
                return;
            }
        }
        bucket.push({ bytes, data });
    }
}
