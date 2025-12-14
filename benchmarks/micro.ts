/* bench/micro.ts
 *
 * Micro-benchmarks for JSBT by data type / structure.
 *
 * Usage:
 *   npx ts-node bench/micro.ts
 *   # or for cleaner profiling:
 *   npm run build && node --cpu-prof dist/bench/micro.js
 *
 * Optional env vars:
 *   MICRO_SCALE=1    (default 1) multiply iterations (0.5 / 2 / 5)
 */

import { JSBT } from '../src/JSBT';
import { performance } from 'node:perf_hooks';

type Encoded = string | Uint8Array;

function nowMs(): number {
    return performance.now();
}

function sizeOfEncoded(x: Encoded): number {
    if (typeof x === 'string') return x.length;
    return x.byteLength;
}

function usPerOp(ms: number, iters: number): number {
    return (ms * 1000) / iters;
}

function fmtNum(n: number, digits = 2): string {
    return n.toFixed(digits);
}

function padRight(s: string, n: number): string {
    return s.length >= n ? s : s + ' '.repeat(n - s.length);
}

function benchOne(name: string, data: unknown, iterations: number, warmupIterations: number) {
    // warmup
    for (let i = 0; i < warmupIterations; i++) {
        const enc = JSBT.encode(data) as Encoded;
        JSBT.decode(enc as any);
    }

    let encodedSample: Encoded | null = null;

    // encode
    const t0 = nowMs();
    for (let i = 0; i < iterations; i++) {
        const enc = JSBT.encode(data) as Encoded;
        if (encodedSample === null) encodedSample = enc;
    }
    const t1 = nowMs();

    // decode
    const encForDecode = encodedSample ?? (JSBT.encode(data) as Encoded);
    const t2 = nowMs();
    for (let i = 0; i < iterations; i++) {
        JSBT.decode(encForDecode as any);
    }
    const t3 = nowMs();

    const encMs = t1 - t0;
    const decMs = t3 - t2;

    const size = sizeOfEncoded(encForDecode);

    const line =
        `${padRight(name, 28)} | size: ${padRight(String(size), 10)} ` +
        `| encode: ${padRight(fmtNum(encMs, 1), 8)} ms (${padRight(fmtNum(usPerOp(encMs, iterations), 2), 10)} us/op)` +
        ` | decode: ${padRight(fmtNum(decMs, 1), 8)} ms (${padRight(fmtNum(usPerOp(decMs, iterations), 2), 10)} us/op)`;

    console.log(line);
}

function scaleIters(base: number): number {
    const sRaw = process.env.MICRO_SCALE;
    const s = sRaw ? Number(sRaw) : 1;
    if (!Number.isFinite(s) || s <= 0) return base;
    return Math.max(1, Math.floor(base * s));
}

/* ---------------------------
 * DATASETS
 * --------------------------- */

function makeNumbersInts(count: number): number[] {
    // safe ints only
    const arr = new Array<number>(count);
    let x = 123456789;
    for (let i = 0; i < count; i++) {
        // linear congruential-ish, stays safe
        x = (x * 1103515245 + 12345) | 0;
        arr[i] = Math.abs(x % 1_000_000);
    }
    return arr;
}

function makeNumbersFloats(count: number): number[] {
    const arr = new Array<number>(count);
    for (let i = 0; i < count; i++) {
        // stable mix of fractional values
        arr[i] = Math.sin(i * 0.001) * 1000 + (i % 10) / 10;
    }
    return arr;
}

function makeShortStrings(count: number): string[] {
    // lots of repetition + some variance
    const base = [
        'GBP',
        'USD',
        'EUR',
        'BUY',
        'SELL',
        'LSE',
        'NASDAQ',
        'OK',
        'WARN',
        'ERR',
        'alpha',
        'beta',
        'gamma',
        'delta',
        'kappa',
        'lambda',
    ];
    const arr = new Array<string>(count);
    for (let i = 0; i < count; i++) {
        const b = base[i % base.length];
        arr[i] = `${b}:${i % 100}`; // still repetitive
    }
    return arr;
}

function makeRepeatedObjects(count: number) {
    // array of similar objects with repeated keys/values
    const venues = ['LSE', 'NASDAQ', 'CME', 'EUREX'];
    const symbols = ['AAPL', 'MSFT', 'GOOG', 'TSLA', 'AMZN', 'META'];
    const side = ['BUY', 'SELL'] as const;

    const meta = {
        source: 'feed-A',
        version: 3,
        flags: ['realtime', 'topOfBook', 'dedup'],
    };

    const commonLevels = [1, 2, 3, 4, 5];

    const arr: any[] = new Array(count);
    for (let i = 0; i < count; i++) {
        arr[i] = {
            type: 'order',
            venue: venues[i % venues.length],
            symbol: symbols[i % symbols.length],
            side: side[i % 2],
            price: 100 + (i % 100) / 10,
            qty: 1000 + (i % 50),
            level: commonLevels[i % commonLevels.length],
            tags: ['hot', 'liquid', 'top'], // repeated
            meta, // shared reference on purpose
            // repeated nested array
            ladder: [101.1, 101.0, 100.9, 100.8, 100.7],
        };
    }
    return arr;
}

function makeDeepNested(depth: number) {
    // deep tree, no cycles
    let node: any = { level: 0, payload: { ok: true, values: [1, 2, 3] } };
    const root = node;
    for (let i = 1; i <= depth; i++) {
        const next = {
            level: i,
            name: `node-${i}`,
            payload: {
                ts: 1700000000000 + i,
                text: 'some repeated text',
                arr: [i, i + 1, i + 2, i + 3],
            },
            next: null as any,
        };
        node.next = next;
        node = next;
    }
    return root;
}

function makeRefsHeavyGraph() {
    // shared refs + cycles
    const sharedArr = [1, 2, 3, 4, 5];
    const sharedObj = { kind: 'shared', arr: sharedArr };

    const a: any = { name: 'A', sharedObj, sharedArr, peer: null, self: null };
    const b: any = { name: 'B', sharedObj, sharedArr, peer: null, self: null };

    a.peer = b;
    b.peer = a;

    a.self = a;
    b.self = b;

    const graph: any = {
        rootA: a,
        rootB: b,
        sharedObj,
        sharedArr,
        many: [] as any[],
    };

    // many repeated references
    for (let i = 0; i < 500; i++) {
        graph.many.push(i % 2 === 0 ? a : b);
        graph.many.push(sharedObj);
        graph.many.push(sharedArr);
    }

    return graph;
}

/* ---------------------------
 * RUN
 * --------------------------- */

function main() {
    const itSmall = scaleIters(2000);
    const itMedium = scaleIters(500);
    const itLarge = scaleIters(100);

    console.log('JSBT micro-benchmarks');
    console.log('='.repeat(110));
    console.log('Tip: set MICRO_SCALE=2 (or 0.5) to scale iterations.');
    console.log('');

    // 1) Numbers
    const ints = makeNumbersInts(50_000);
    const floats = makeNumbersFloats(50_000);

    console.log('1) Numbers');
    console.log('-'.repeat(110));
    benchOne('numbers: int array (50k)', ints, itMedium, Math.max(10, Math.floor(itMedium / 10)));
    benchOne('numbers: float array (50k)', floats, itMedium, Math.max(10, Math.floor(itMedium / 10)));
    console.log('');

    // 2) Short strings
    const strings = makeShortStrings(50_000);

    console.log('2) Short strings');
    console.log('-'.repeat(110));
    benchOne('strings: short array (50k)', strings, itMedium, Math.max(10, Math.floor(itMedium / 10)));
    console.log('');

    // 3) Repeated objects
    const repeated = makeRepeatedObjects(10_000);

    console.log('3) Repeated objects / repeated keys');
    console.log('-'.repeat(110));
    benchOne('objects: repeated array (10k)', repeated, itLarge, Math.max(5, Math.floor(itLarge / 10)));
    console.log('');

    // 4) Deep nesting
    const deep = makeDeepNested(500);

    console.log('4) Deep nested structure');
    console.log('-'.repeat(110));
    benchOne('deep: linked nodes (depth 500)', deep, itSmall, Math.max(10, Math.floor(itSmall / 10)));
    console.log('');

    // 5) Refs-heavy graph
    const graph = makeRefsHeavyGraph();

    console.log('5) Refs-heavy graph (shared refs + cycles)');
    console.log('-'.repeat(110));
    benchOne('graph: refs-heavy (many shared)', graph, itSmall, Math.max(10, Math.floor(itSmall / 10)));
    console.log('');

    console.log('Done.');
}

main();
