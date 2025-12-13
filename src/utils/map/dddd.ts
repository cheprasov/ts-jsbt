const FNV_OFFSET_64 = 14695981039346656037n;
const FNV_PRIME_64 = 1099511628211n;

export function hashBytes64(bytes: Uint8Array): bigint {
    let h = FNV_OFFSET_64;
    for (let i = 0; i < bytes.length; i++) {
        h ^= BigInt(bytes[i]);
        h = (h * FNV_PRIME_64) & 0xffffffffffffffffn; // keep 64-bit
    }
    return h;
}

export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

type Entry = { bytes: Uint8Array; refId: number };

export class ByteInternMap {

    protected _map = new Map<bigint, Entry[]>();

    getRefId(bytes: Uint8Array): number | undefined {
        const h = hashBytes64(bytes);
        const bucket = this._map.get(h);
        if (!bucket) return undefined;
        for (const e of bucket) {
            if (bytesEqual(e.bytes, bytes)) return e.refId;
        }
        return undefined;
    }

    set(bytes: Uint8Array, refId: number) {
        const h = hashBytes64(bytes);
        const bucket = this._map.get(h);
        if (!bucket) {
            this._map.set(h, [{ bytes, refId }]);
            return;
        }
        // avoid duplicates if called twice
        for (const e of bucket) {
            if (bytesEqual(e.bytes, bytes)) return;
        }
        bucket.push({ bytes, refId });
    }

}
