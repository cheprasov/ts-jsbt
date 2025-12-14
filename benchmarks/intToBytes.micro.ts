/* bench/intToBytes.micro.ts */

import { integerToBytes as integerToBytesA } from '../src/converter/integerToBytes';
import { integerToBytes as integerToBytesB } from '../src/converter/integerToBytes';

type Fn = (n: number, byteSize?: number, be?: boolean) => number[];

function makeInputs(count: number): number[] {
    const arr = new Array<number>(count);
    let x = 123456789;
    for (let i = 0; i < count; i++) {
        x = (1103515245 * x + 12345) >>> 0;
        arr[i] = (x % 2_000_000) * 1000 + (x & 1023);
    }
    arr[0] = 0;
    arr[1] = 255;
    arr[2] = 256;
    arr[3] = 65535;
    arr[4] = 65536;
    arr[5] = 2 ** 31 - 1;
    return arr;
}

function bench(label: string, fn: Fn, inputs: number[], iters: number, byteSize: number, be: boolean) {
    let sink = 0;

    // warmup
    for (let i = 0; i < 20000; i++) {
        const b = fn(inputs[i % inputs.length], byteSize, be);
        sink ^= b.length;
    }

    const runs = 9;
    const times: number[] = [];

    for (let r = 0; r < runs; r++) {
        const t0 = process.hrtime.bigint();
        for (let i = 0; i < iters; i++) {
            const b = fn(inputs[i % inputs.length], byteSize, be);
            sink ^= b.length + (b[0] | 0);
        }
        const t1 = process.hrtime.bigint();
        times.push(Number(t1 - t0));
    }

    times.sort((a, b) => a - b);
    const median = times[(times.length / 2) | 0];
    const usPerOp = median / iters / 1000;

    if (sink === 123456) console.log('sink', sink);

    console.log(`${label.padEnd(28)} | ${(median / 1e6).toFixed(2)} ms | ${usPerOp.toFixed(3)} us/op`);
}

const inputs = makeInputs(20000);

// IMPORTANT: iters так, чтобы один прогон был >= 50–100ms
const ITERS_VAR = 5_000_000;
const ITERS_FIXED = 3_000_000;

console.log('\n--- variable length ---');
bench('A variable', integerToBytesA, inputs, ITERS_VAR, 0, false);
bench('B variable', integerToBytesB, inputs, ITERS_VAR, 0, false);

console.log('\n--- fixed 4 bytes ---');
bench('A fixed(4)', integerToBytesA, inputs, ITERS_FIXED, 4, false);
bench('B fixed(4)', integerToBytesB, inputs, ITERS_FIXED, 4, false);

console.log('\n--- fixed 7 bytes ---');
bench('A fixed(7)', integerToBytesA, inputs, ITERS_FIXED, 7, false);
bench('B fixed(7)', integerToBytesB, inputs, ITERS_FIXED, 7, false);

console.log('\n--- fixed 7 BE ---');
bench('A fixed(7) BE', integerToBytesA, inputs, ITERS_FIXED, 7, true);
bench('B fixed(7) BE', integerToBytesB, inputs, ITERS_FIXED, 7, true);
