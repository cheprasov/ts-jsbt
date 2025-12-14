// bench/compare.ts
import { performance } from 'perf_hooks';
import { JSBT } from '../src/JSBT';

const ITERATIONS_SIMPLE = 10_000;
const ITERATIONS_COMPLEX = 1_000;
const ITERATIONS_REPEATED = 10;

type EncodeFn = (data: any) => any;
type DecodeFn = (payload: any) => any;

// -------------------- Data sets -------------------- //

const simpleData = {
    id: 123456,
    name: 'John Doe',
    isActive: true,
    age: 42,
    tags: ['node', 'typescript', 'binary', 'serialization'],
    scores: Array.from({ length: 100 }, (_, i) => i * 3.14159),
    createdAt: new Date().toISOString(),
    balance: 12345.67,
    meta: {
        retries: 3,
        source: 'benchmark',
        flags: { a: true, b: false, c: true },
    },
};

const complexData: any = {
    user: {
        id: 123,
        name: 'John Complex',
        roles: new Set(['admin', 'editor', 'viewer']),
    },
    relations: new Map<any, any>([
        ['selfId', 123],
        ['meta', { createdAt: new Date(), flags: { a: true, b: false } }],
    ]),
    bigArray: Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        tags: ['node', 'ts', 'binary', 'jsbt'],
        values: new Float64Array([Math.random(), Math.random(), Math.random()]),
    })),
    nested: {
        mapOfSets: new Map<string, Set<number>>([
            ['first', new Set([1, 2, 3])],
            ['second', new Set([10, 20, 30])],
        ]),
    },
};

// циклическая ссылка
complexData.self = complexData;

// REPEATED DATA: большой массив однотипных объектов
const baseDate = new Date();
const baseScores = Array.from({ length: 20 }, (_, i) => i * 1.2345);

const repeatedData = Array.from({ length: 10_000 }, (_, i) => {
    return {
        id: i % 100, // много повторяющихся id
        name: `User ${i % 50}`, // повторяющиеся имена
        isActive: i % 3 !== 0,
        age: 25 + (i % 5),
        tags: ['node', 'typescript', 'binary', 'serialization'], // полностью повторяющийся массив
        scores: baseScores, // один и тот же массив ссылкой
        createdAt: baseDate.toISOString(), // одинаковая дата
        balance: 1000 + (i % 10),
        meta: {
            retries: i % 3,
            source: 'bulk-benchmark',
            flags: { a: true, b: false, c: true }, // одинаковый объект
            group: `group-${i % 10}`, // всего 10 разных групп
        },
    };
});

// Для protobuf сделаем обёртку { items: Data[] }
const repeatedDataForProtobuf = { items: repeatedData };

// -------------------- Helpers -------------------- //

function getSizeBytes(payload: any): number {
    if (typeof payload === 'string') {
        return Buffer.byteLength(payload, 'utf8');
    }
    if (payload instanceof Uint8Array) {
        return payload.byteLength;
    }
    if (Buffer.isBuffer(payload)) {
        return payload.length;
    }
    return Buffer.byteLength(String(payload), 'utf8');
}

function bench(name: string, dataLabel: string, data: any, encode: EncodeFn, decode: DecodeFn, iterations: number) {
    try {
        const onceEncoded = encode(data);
        const size = getSizeBytes(onceEncoded);

        // encode
        let t0 = performance.now();
        for (let i = 0; i < iterations; i++) {
            encode(data);
        }
        let t1 = performance.now();
        const encodeMs = t1 - t0;
        const encodeUsPerOp = (encodeMs * 1000) / iterations;

        // decode
        t0 = performance.now();
        for (let i = 0; i < iterations; i++) {
            decode(onceEncoded);
        }
        t1 = performance.now();
        const decodeMs = t1 - t0;
        const decodeUsPerOp = (decodeMs * 1000) / iterations;

        console.log(
            `${name.padEnd(10)} | ${dataLabel.padEnd(9)} | size: ${String(size).padStart(7)} bytes | ` +
                `encode: ${encodeMs.toFixed(1).padStart(7)} ms (${encodeUsPerOp.toFixed(2).padStart(8)} µs/op) | ` +
                `decode: ${decodeMs.toFixed(1).padStart(7)} ms (${decodeUsPerOp.toFixed(2).padStart(8)} µs/op)`
        );
    } catch (e: any) {
        const msg = e && e.message ? e.message : String(e);
        console.log(`${name.padEnd(10)} | ${dataLabel.padEnd(9)} | ERROR: ${msg}`);
    }
}

async function main() {
    console.log('Benchmark JSBT)');
    console.log('='.repeat(140));

    // ---------- SIMPLE DATA ---------- //

    console.log('\nSIMPLE DATA');
    console.log(`Iterations per lib: ${ITERATIONS_SIMPLE}`);
    console.log('-'.repeat(140));

    bench(
        'JSON',
        'simple',
        simpleData,
        (data) => JSON.stringify(data),
        (payload) => JSON.parse(payload),
        ITERATIONS_SIMPLE
    );

    bench(
        'JSBT',
        'simple',
        simpleData,
        (data) => JSBT.encode(data),
        (payload) => JSBT.decode(payload),
        ITERATIONS_SIMPLE
    );

    // ---------- COMPLEX DATA ---------- //

    console.log('\nCOMPLEX DATA (Map, Set, Date, TypedArray, circular ref)');
    console.log(`Iterations per lib: ${ITERATIONS_COMPLEX}`);
    console.log('-'.repeat(140));

    bench(
        'JSON',
        'complex',
        complexData,
        (data) => JSON.stringify(data),
        (payload) => JSON.parse(payload),
        ITERATIONS_COMPLEX
    );

    bench(
        'JSBT',
        'complex',
        complexData,
        (data) => JSBT.encode(data),
        (payload) => JSBT.decode(payload),
        ITERATIONS_COMPLEX
    );

    // ---------- REPEATED DATA (большой массив похожих объектов) ---------- //

    console.log('\nREPEATED DATA (large array of similar objects)');
    console.log(`Iterations per lib: ${ITERATIONS_REPEATED}`);
    console.log('-'.repeat(140));

    bench(
        'JSON',
        'repeated',
        repeatedData,
        (data) => JSON.stringify(data),
        (payload) => JSON.parse(payload),
        ITERATIONS_REPEATED
    );

    bench(
        'JSBT',
        'repeated',
        repeatedData,
        (data) => JSBT.encode(data),
        (payload) => JSBT.decode(payload),
        ITERATIONS_REPEATED
    );

    console.log('='.repeat(140));
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
