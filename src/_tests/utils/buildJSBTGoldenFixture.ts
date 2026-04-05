// fixtures/jsbt-golden.ts

export class Foo {
    constructor(public a: number, public b: string) {}
}

export function buildJSBTGoldenFixture() {
    // --- shared refs / cycles ---
    const sharedObj = { tag: 'shared', n: 123 };
    const sharedArr: any[] = [sharedObj, sharedObj, sharedObj, sharedObj]; // same refs
    const cycleObj: any = { name: 'cycle' };
    cycleObj.self = cycleObj; // cycle

    // --- sparse array (holes) ---
    const sparse: any[] = [];
    sparse[0] = 'zero';
    sparse[2] = 'two'; // hole at index 1
    sparse[10] = sharedObj;

    // --- plain object + null-proto object ---
    const plain = { x: 1, y: '2', nested: { z: true } };
    // const nullProto = Object.create(null) as Record<string, any>;
    // nullProto.a = 1;
    // nullProto.b = 'x';

    // --- symbols (JSBT expects Symbol.for key to exist) ---
    const symEmpty = Symbol.for('');
    const symHello = Symbol.for('hello');

    // --- numbers: integers + floats + special constants ---
    const numbers = [
        0,
        -0,
        1,
        -1,
        255,
        256,
        65535,
        65536,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        1.5,
        -1.5,
        156.25,
        Math.PI,
        Number.NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        // IMPORTANT: > MAX_SAFE_INTEGER must be treated as float (per your fix)
        Number.MAX_SAFE_INTEGER + 1,
        Number.MIN_SAFE_INTEGER - 1,
    ];

    // --- BigInt ---
    const bigints = [0n, 1n, -1n, 2n ** 63n - 1n, -(2n ** 63n), 2n ** 100n];

    // --- strings (utf-8 + surrogate-ish cases) ---
    const strings = ['', 'ascii', 'Привет', 'emoji 🙂🚀', 'CJK 漢字', 'line\nbreak', '\u0000 null-char'];

    // --- Date ---
    const dates = [new Date(0), new Date('2020-01-02T03:04:05.006Z'), new Date('1984-10-10 00:00:00')];

    // --- boxed primitives ---
    const boxed = [new Number(42), new String('boxed'), new Boolean(false)];

    // --- Map / Set with complex keys & shared refs ---
    const map = new Map<any, any>();
    map.set('k', 'v');
    map.set(1, sharedObj);
    map.set(sharedObj, 'value-by-object-key');
    map.set(symHello, { via: 'symbol-key' });

    const set = new Set<any>();
    set.add('x');
    set.add(1);
    set.add(sharedObj);
    set.add(symEmpty);

    // --- typed arrays / arraybuffer (guarded for old envs) ---
    const ab = typeof ArrayBuffer !== 'undefined' ? new ArrayBuffer(8) : null;
    const u8 = typeof Uint8Array !== 'undefined' ? new Uint8Array([0, 1, 2, 255]) : null;
    const i16 = typeof Int16Array !== 'undefined' ? new Int16Array([-1, 0, 1, 1234]) : null;
    // todo add NaN
    const f64 = typeof Float64Array !== 'undefined' ? new Float64Array([Math.PI, 156.25, -0]) : null;

    // --- class instance (JSBT encodes it as class-ish object; reconstruction depends on factories) ---
    const foo = new Foo(7, 'seven');
    // optional marker (JSBT uses __jsbtConstructorName by default)
    // (foo as any).__jsbtConstructorName = 'Foo';

    // --- final graph root ---
    const root: any = {
        meta: {
            fixture: 'JSBT golden',
            versionHint: 1,
        },

        constants: {
            undefinedValue: undefined,
            nullValue: null,
            trueValue: true,
            falseValue: false,
        },

        strings,
        numbers,
        bigints,
        dates,
        boxed,

        symbols: {
            symEmpty,
            symHello,
        },

        objects: {
            plain,
            //nullProto,
            sharedObj,
            cycleObj,
        },

        arrays: {
            sharedArr,
            sparse,
        },

        collections: {
            map,
            set,
        },

        binary: {
            ab,
            u8,
            i16,
            f64,
        },

        classes: {
            foo,
        },
    };

    // more shared refs across the graph
    root.objects.alsoShared = sharedObj;
    root.collections.map.set('sharedObjAgain', sharedObj);

    return root;
}
