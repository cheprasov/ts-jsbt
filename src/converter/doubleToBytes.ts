export doubleToBytes = (value: number): [number, number, number, number, number, number, number] => {
    var buffer = new ArrayBuffer(8); // JS numbers are 8 bytes long, or 64 bits
    var longNum = new Float64Array(buffer); // so equivalent to Float64

    longNum[0] = value;

    const r = Array.from(new Uint8Array(buffer)).reverse(); // reverse to get little endian
    console.log(r.map((v) => v.toString(2)));
    return r as any;
}
