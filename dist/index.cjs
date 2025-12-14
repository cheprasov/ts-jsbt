"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ByteStream: () => ByteStream,
  JSBT: () => JSBT
});
module.exports = __toCommonJS(index_exports);

// src/reader/ByteStream.ts
var ByteStream = class {
  constructor(msg = []) {
    this._msgArrIndex = 0;
    this._msgChrIndex = 0;
    this._restByte = 0;
    this._isStreamComplete = false;
    this._isEOF = false;
    this._waitingPromise = null;
    this._waitingPromiseResolver = null;
    this._waitingRejectTimeout = null;
    this._readBytes = [];
    this._msg = Array.isArray(msg) ? [...msg] : [msg];
  }
  getReadBytesIndex() {
    return this._readBytes.length;
  }
  getReadBytes() {
    return this._readBytes;
  }
  addMessage(msg) {
    if (Array.isArray(msg)) {
      this._msg.push(...msg);
    } else {
      this._msg.push(msg);
    }
    if (this._waitingPromise && this._waitingPromiseResolver) {
      this._waitingPromiseResolver();
    }
  }
  completeStream(msg = []) {
    this.addMessage(msg);
    this._isStreamComplete = true;
  }
  isCompleteMessage() {
    return this._isStreamComplete;
  }
  isEOF() {
    return this._isEOF;
  }
  waitMessages(timeout) {
    if (this._waitingPromise) {
      return this._waitingPromise;
    }
    if (this._isStreamComplete) {
      return Promise.reject("Can not wait completed stream");
    }
    const promise = new Promise((resolve, reject) => {
      this._waitingPromiseResolver = resolve;
      this._waitingRejectTimeout = setTimeout(() => {
        reject(`Waiting timeout ${timeout}ms is riched`);
      }, timeout);
    }).finally(() => {
      if (this._waitingRejectTimeout) {
        clearTimeout(this._waitingRejectTimeout);
        this._waitingRejectTimeout = null;
      }
      this._waitingPromise = null;
      this._waitingPromiseResolver = null;
    });
    this._waitingPromise = promise;
    return promise;
  }
  async readStreamBytes(count = 1, timeout = 3e4) {
    const bytes = new Uint8Array(count);
    let bytesLen = 0;
    while (bytesLen < count) {
      if (this._restByte) {
        bytes[bytesLen] = this._restByte;
        this._readBytes.push(this._restByte);
        this._restByte = 0;
        bytesLen += 1;
        continue;
      }
      if (!(this._msgArrIndex in this._msg)) {
        if (!this._isStreamComplete) {
          await this.waitMessages(timeout);
          continue;
        }
        this._isEOF = true;
        throw new Error(`Can not read ${count - bytesLen} bytes`);
      }
      let charCode = NaN;
      const block = this._msg[this._msgArrIndex];
      if (typeof block === "number") {
        charCode = block;
        this._msgChrIndex = 0;
        delete this._msg[this._msgArrIndex];
        this._msgArrIndex += 1;
      } else {
        charCode = block.charCodeAt(this._msgChrIndex);
        if (charCode > 255) {
          this._restByte = (charCode & 65280) >>> 8;
          charCode = charCode & 255;
        }
        this._msgChrIndex += 1;
      }
      if (Number.isNaN(charCode)) {
        delete this._msg[this._msgArrIndex];
        this._msgArrIndex += 1;
        this._msgChrIndex = 0;
        continue;
      }
      bytes[bytesLen] = charCode;
      this._readBytes.push(charCode);
      bytesLen += 1;
    }
    return bytes;
  }
  async readStreamByte() {
    return (await this.readStreamBytes(1))[0];
  }
  readBytes(count = 1) {
    if (!this._isStreamComplete) {
      throw new Error("Sync bytes read is allowed only for completed stream");
    }
    const bytes = new Uint8Array(count);
    let bytesLen = 0;
    while (bytesLen < count) {
      if (this._restByte) {
        bytes[bytesLen] = this._restByte;
        this._readBytes.push(this._restByte);
        this._restByte = 0;
        bytesLen += 1;
        continue;
      }
      if (!(this._msgArrIndex in this._msg)) {
        this._isEOF = true;
        throw new Error(`Can not read ${count - bytesLen} bytes`);
      }
      let charCode = NaN;
      const block = this._msg[this._msgArrIndex];
      if (typeof block === "number") {
        charCode = block;
        this._msgChrIndex = 0;
        delete this._msg[this._msgArrIndex];
        this._msgArrIndex += 1;
      } else {
        charCode = block.charCodeAt(this._msgChrIndex);
        if (charCode > 255) {
          this._restByte = (charCode & 65280) >>> 8;
          charCode = charCode & 255;
        }
        this._msgChrIndex += 1;
      }
      if (Number.isNaN(charCode)) {
        delete this._msg[this._msgArrIndex];
        this._msgArrIndex += 1;
        this._msgChrIndex = 0;
        continue;
      }
      bytes[bytesLen] = charCode;
      this._readBytes.push(charCode);
      bytesLen += 1;
    }
    return bytes;
  }
  readByte() {
    return this.readBytes(1)[0];
  }
};

// src/converter/bytesToInteger.ts
var bytesToInteger = (bytes) => {
  const len = Array.isArray(bytes) ? bytes.length : bytes.byteLength;
  if (len === 0) {
    return 0;
  }
  let int = 0;
  for (let i = 0; i < len; i += 1) {
    const byte = bytes[i];
    int = byte * 256 ** i + int;
  }
  return int;
};

// src/enums/EConstantByteCode.ts
var EConstantByteCode = ((EConstantByteCode2) => {
  EConstantByteCode2[EConstantByteCode2["FALSE"] = 0 /* Constant */ | 0] = "FALSE";
  EConstantByteCode2[EConstantByteCode2["TRUE"] = 0 /* Constant */ | 1] = "TRUE";
  EConstantByteCode2[EConstantByteCode2["Null"] = 0 /* Constant */ | 2] = "Null";
  EConstantByteCode2[EConstantByteCode2["Undefined"] = 0 /* Constant */ | 3] = "Undefined";
  EConstantByteCode2[EConstantByteCode2["NaN"] = 0 /* Constant */ | 4] = "NaN";
  EConstantByteCode2[EConstantByteCode2["Pos_Infinity"] = 0 /* Constant */ | 5] = "Pos_Infinity";
  EConstantByteCode2[EConstantByteCode2["Neg_Infinity"] = 0 /* Constant */ | 6] = "Neg_Infinity";
  EConstantByteCode2[EConstantByteCode2["Empty_Value"] = 0 /* Constant */ | 7] = "Empty_Value";
  return EConstantByteCode2;
})(EConstantByteCode || {});

// src/decoder/decodeInteger.ts
var decodeInteger = (typeByte, stream) => {
  if ((typeByte & 240) !== 32 /* Integer */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding integer`);
  }
  const count = typeByte & 7;
  const isNegative = Boolean(typeByte & 8);
  if (count === 0) {
    return isNegative ? -0 : 0;
  }
  const bytesCount = stream.readBytes(count);
  const int = bytesToInteger(bytesCount);
  return isNegative ? -int : int;
};

// src/decoder/decodeArray.ts
var decodeArray = (typeByte, stream, options, initArr = []) => {
  if ((typeByte & 240) !== 80 /* Array */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding array`);
  }
  const isKeyValueEncoding = typeByte & 8;
  const bytesCount = typeByte & 7;
  if (bytesCount === 0) {
    return initArr;
  }
  const arrayLen = bytesToInteger(stream.readBytes(bytesCount));
  const itemsCoint = isKeyValueEncoding ? bytesToInteger(stream.readBytes(bytesCount)) : arrayLen;
  const arr = initArr;
  arr.length = arrayLen;
  if (isKeyValueEncoding) {
    for (let i = 0; i < itemsCoint; i += 1) {
      const key = decodeInteger(stream.readByte(), stream);
      const value = decode(stream.readByte(), stream, options);
      arr[key] = value;
    }
  } else {
    for (let i = 0; i < arrayLen; i += 1) {
      const byte = stream.readByte();
      if (byte === EConstantByteCode.Empty_Value) {
        continue;
      }
      const value = decode(byte, stream, options);
      arr[i] = value;
    }
  }
  return arr;
};

// src/converter/bytesToBigInt.ts
var bytesToBigInt = (bytes) => {
  const len = Array.isArray(bytes) ? bytes.length : bytes.byteLength;
  if (len === 0) {
    return 0n;
  }
  let bint = 0n;
  for (let i = 0; i < len; i += 1) {
    const byte = BigInt(bytes[i]);
    bint = byte << BigInt(8 * i) | bint;
  }
  return bint;
};

// src/decoder/decodeBigInt.ts
var decodeBigInt = (typeByte, stream) => {
  if ((typeByte & 240) !== 64 /* BigInt */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding bigint`);
  }
  const count = typeByte & 7;
  const isNegative = Boolean(typeByte & 8);
  if (count === 0) {
    return isNegative ? -0n : 0n;
  }
  const bytesCount = stream.readBytes(count);
  const encodeCount = bytesToInteger(bytesCount);
  const encodeBytes = stream.readBytes(encodeCount);
  const bint = bytesToBigInt(encodeBytes);
  return isNegative ? -bint : bint;
};

// src/decoder/decodeConstant.ts
var constantMap = /* @__PURE__ */ new Map([
  [EConstantByteCode.FALSE, false],
  [EConstantByteCode.TRUE, true],
  [EConstantByteCode.Null, null],
  [EConstantByteCode.Undefined, void 0],
  [EConstantByteCode.NaN, NaN],
  [EConstantByteCode.Pos_Infinity, Infinity],
  [EConstantByteCode.Neg_Infinity, -Infinity],
  [EConstantByteCode.Empty_Value, ""]
]);
var decodeConstant = (typeByte, stream) => {
  if ((typeByte & 240) !== 0 /* Constant */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding contant`);
  }
  if (!constantMap.has(typeByte)) {
    throw new Error("Not supported contsant for decoding");
  }
  return constantMap.get(typeByte);
};

// src/decoder/decodeDate.ts
var decodeDate = (typeByte, stream) => {
  if ((typeByte & 240) !== 192 /* Date */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding Date`);
  }
  const count = typeByte & 7;
  const isNegative = Boolean(typeByte & 8);
  if (count === 0) {
    return /* @__PURE__ */ new Date(0);
  }
  const bytesCount = stream.readBytes(count);
  const int = bytesToInteger(bytesCount);
  return new Date(isNegative ? -int : int);
};

// src/decoder/decodeFloat.ts
var decodeFloat = (typeByte, stream) => {
  if ((typeByte & 240) !== 48 /* Float */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding float`);
  }
  const count = (typeByte & 7) + 1;
  let map = 0;
  if (typeByte & 8) {
    map = stream.readByte();
  } else {
    for (let i = 0; i < count; i += 1) {
      map = map | 1 << i;
    }
  }
  const bytesCount = stream.readBytes(count);
  const floatBytes = new Uint8Array(8);
  let byteIndex = 0;
  for (let i = 0; i < 8; i += 1) {
    if (map & 128 >>> i) {
      floatBytes[i] = bytesCount[byteIndex];
      byteIndex += 1;
    }
  }
  const float = new Float64Array(floatBytes.buffer);
  return float[0];
};

// src/decoder/decodeMap.ts
var decodeMap = (typeByte, stream, options, initMap = /* @__PURE__ */ new Map()) => {
  if ((typeByte & 240) !== 144 /* Map */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding map`);
  }
  const bytesCount = typeByte & 7;
  if (bytesCount === 0) {
    return initMap;
  }
  const count = bytesToInteger(stream.readBytes(bytesCount));
  const map = initMap;
  for (let i = 0; i < count; i += 1) {
    const key = decode(stream.readByte(), stream, options);
    const value = decode(stream.readByte(), stream, options);
    map.set(key, value);
  }
  return map;
};

// src/decoder/decodeObject.ts
var decodeObject = (typeByte, stream, options, initObj = {}) => {
  if ((typeByte & 240) !== 112 /* Object */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding object`);
  }
  const bytesCount = typeByte & 7;
  if (bytesCount === 0) {
    return initObj;
  }
  const count = bytesToInteger(stream.readBytes(bytesCount));
  const isClassInstance2 = Boolean(typeByte & 8);
  const constructorName = isClassInstance2 ? decode(null, stream, options) : null;
  const obj = initObj;
  for (let i = 0; i < count; i += 1) {
    const key = decode(null, stream, options);
    const value = decode(null, stream, options);
    obj[key] = value;
  }
  if (isClassInstance2) {
    const constructorNameKey = options.objects.classInstanceConstructorNameKey;
    if (constructorNameKey !== null) {
      const classConstructor = options.objects.factories[constructorName];
      if (classConstructor) {
        Object.setPrototypeOf(obj, classConstructor.prototype);
      } else {
        Object.defineProperty(obj, constructorNameKey, {
          value: constructorName,
          configurable: true,
          enumerable: false,
          writable: false
        });
      }
    }
  }
  return obj;
};

// src/decoder/decodePrimitiveObjectWrapper.ts
var decodePrimitiveObjectWrapper = (typeByte, stream, options) => {
  if (typeByte !== (240 /* Instruction */ | 0)) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding primitive object wrapper`);
  }
  const value = decode(stream.readByte(), stream, options);
  switch (typeof value) {
    case "string":
      return new String(value);
    case "boolean":
      return new Boolean(value);
    case "number":
      return new Number(value);
  }
  throw new Error(`Can not create Primitive Object Wrapper for value ${value}, type ${typeof value}`);
};

// src/decoder/options/createDecodeOptions.ts
var createDecodeOptions = () => {
  return {
    context: {
      refs: [],
      refByteSlice: [],
      readBytes: []
    },
    objects: {
      classInstanceConstructorNameKey: "__jsbtConstructorName",
      factories: {}
    }
  };
};

// src/decoder/decodeRef.ts
var decodeRef = (typeByte, stream, options) => {
  if ((typeByte & 240) !== 176 /* Refs */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding ref`);
  }
  const isCopy = Boolean(typeByte & 8);
  const count = typeByte & 7;
  const id = count === 0 ? 0 : bytesToInteger(stream.readBytes(count));
  const refs = options.context.refs;
  if (!(id in refs)) {
    throw new Error(`Incorrect ref ID ${id}, max id is ${refs.length}`);
  }
  if (isCopy) {
    const refSlice = options.context.refByteSlice[id];
    const slice = options.context.readBytes.slice(refSlice.index, refSlice.index + refSlice.length);
    const decOptions = createDecodeOptions();
    decOptions.context = options.context;
    const st = new ByteStream(slice);
    st.completeStream();
    const copy = decode(null, st, decOptions);
    return copy;
  }
  return refs[id];
};

// src/decoder/decodeSet.ts
var decodeSet = (typeByte, stream, options, initSet = /* @__PURE__ */ new Set()) => {
  if ((typeByte & 240) !== 128 /* Set */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding set`);
  }
  const bytesCount = typeByte & 7;
  if (bytesCount === 0) {
    return initSet;
  }
  const count = bytesToInteger(stream.readBytes(bytesCount));
  const set = initSet;
  for (let i = 0; i < count; i += 1) {
    const value = decode(stream.readByte(), stream, options);
    set.add(value);
  }
  return set;
};

// src/decoder/decodeString.ts
var decodeString = (typeByte, stream) => {
  if ((typeByte & 240) !== 16 /* String */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding string`);
  }
  const count = typeByte & 7;
  if (count === 0) {
    return "";
  }
  const bytesCount = stream.readBytes(count);
  const bytesLength = bytesToInteger(bytesCount);
  const decoder = new TextDecoder("utf-8");
  const bytes = stream.readBytes(bytesLength);
  return decoder.decode(bytes);
};

// src/converter/bytesToUtf16.ts
var bytesToUtf16 = (bytes) => {
  const msg = [];
  const len = Array.isArray(bytes) ? bytes.length : bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    const currentByte = bytes[i];
    const nextByte = bytes[i + 1];
    if (nextByte >= 216 && nextByte <= 219 || nextByte >= 220 && nextByte <= 223) {
      msg.push(String.fromCharCode(nextByte << 8 | currentByte));
      i += 1;
      continue;
    }
    msg.push(String.fromCharCode(currentByte));
  }
  return msg.join("");
};

// src/decoder/decodeSymbol.ts
var decodeSymbol = (typeByte, stream) => {
  if ((typeByte & 240) !== 160 /* Symbol */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding symbol`);
  }
  const count = typeByte & 7;
  if (count === 0) {
    return /* @__PURE__ */ Symbol.for("");
  }
  const bytesCount = stream.readBytes(count);
  const strLen = bytesToInteger(bytesCount);
  const bytes = stream.readBytes(strLen);
  return Symbol.for(bytesToUtf16(bytes));
};

// src/enums/ETypedArrayByteCode.ts
var ETypedArrayByteCode = ((ETypedArrayByteCode2) => {
  ETypedArrayByteCode2[ETypedArrayByteCode2["ArrayBuffer"] = 0 | 96 /* Typed_Array */] = "ArrayBuffer";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Int8Array"] = 1 | 96 /* Typed_Array */] = "Int8Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Uint8Array"] = 2 | 96 /* Typed_Array */] = "Uint8Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Uint8ClampedArray"] = 3 | 96 /* Typed_Array */] = "Uint8ClampedArray";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Int16Array"] = 4 | 96 /* Typed_Array */] = "Int16Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Uint16Array"] = 5 | 96 /* Typed_Array */] = "Uint16Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Int32Array"] = 6 | 96 /* Typed_Array */] = "Int32Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Uint32Array"] = 7 | 96 /* Typed_Array */] = "Uint32Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Float32Array"] = 8 | 96 /* Typed_Array */] = "Float32Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["Float64Array"] = 9 | 96 /* Typed_Array */] = "Float64Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["BigInt64Array"] = 10 | 96 /* Typed_Array */] = "BigInt64Array";
  ETypedArrayByteCode2[ETypedArrayByteCode2["BigUint64Array"] = 11 | 96 /* Typed_Array */] = "BigUint64Array";
  return ETypedArrayByteCode2;
})(ETypedArrayByteCode || {});

// src/utils/typedArrays/getTypedArrayByteCount.ts
var getBytesPerElement = (arr) => {
  if (arr instanceof ArrayBuffer) {
    return 1;
  }
  return arr.BYTES_PER_ELEMENT;
};

// src/decoder/decodeTypedArray.ts
var typedArrayConstructorByType = {};
if (typeof Uint8Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.ArrayBuffer] = Uint8Array;
  typedArrayConstructorByType[ETypedArrayByteCode.Uint8Array] = Uint8Array;
}
if (typeof Int8Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.Int8Array] = Int8Array;
}
if (typeof Uint8ClampedArray !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.Uint8ClampedArray] = Uint8ClampedArray;
}
if (typeof Int16Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.Int16Array] = Int16Array;
}
if (typeof Uint16Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.Uint16Array] = Uint16Array;
}
if (typeof Int32Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.Int32Array] = Int32Array;
}
if (typeof Uint32Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.Uint32Array] = Uint32Array;
}
if (typeof Float32Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.Float32Array] = Float32Array;
}
if (typeof Float64Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.Float64Array] = Float64Array;
}
if (typeof BigInt64Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.BigInt64Array] = BigInt64Array;
}
if (typeof BigUint64Array !== "undefined") {
  typedArrayConstructorByType[ETypedArrayByteCode.BigUint64Array] = BigUint64Array;
}
var dataViewGetter = {
  [ETypedArrayByteCode.ArrayBuffer]: "getUint8",
  [ETypedArrayByteCode.Int8Array]: "getInt8",
  [ETypedArrayByteCode.Uint8Array]: "getUint8",
  [ETypedArrayByteCode.Uint8ClampedArray]: "getUint8",
  [ETypedArrayByteCode.Int16Array]: "getInt16",
  [ETypedArrayByteCode.Uint16Array]: "getUint16",
  [ETypedArrayByteCode.Int32Array]: "getInt32",
  [ETypedArrayByteCode.Uint32Array]: "getUint32",
  [ETypedArrayByteCode.Float32Array]: "getFloat32",
  [ETypedArrayByteCode.Float64Array]: "getFloat64",
  [ETypedArrayByteCode.BigInt64Array]: "getBigInt64",
  [ETypedArrayByteCode.BigUint64Array]: "getBigInt64"
};
var decodeTypedArray = (typeByte, stream, options) => {
  if ((typeByte & 240) !== 96 /* Typed_Array */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding typed array`);
  }
  const secondByte = stream.readByte();
  const isKeyValueEncoding = secondByte & 64;
  const itemsBytesCount = secondByte & 7;
  const lengthBytesCount = (secondByte & 56) >>> 3;
  const TypedArrayConstructor = typedArrayConstructorByType[typeByte];
  const tarr0 = new TypedArrayConstructor(0);
  const bytesPerElement = getBytesPerElement(tarr0);
  const len = isKeyValueEncoding ? bytesToInteger(stream.readBytes(lengthBytesCount)) : bytesToInteger(stream.readBytes(itemsBytesCount));
  const count = isKeyValueEncoding ? bytesToInteger(stream.readBytes(itemsBytesCount)) : len;
  const dataGetterName = dataViewGetter[typeByte];
  if (isKeyValueEncoding) {
    const tarr = new TypedArrayConstructor(Math.round(len / bytesPerElement));
    for (let i = 0; i < count; i += 1) {
      const key = decodeInteger(stream.readByte(), stream);
      const valueBytes = stream.readBytes(bytesPerElement);
      const view = new DataView(valueBytes.buffer);
      tarr[key] = view[dataGetterName](0, true);
    }
    if (typeByte === ETypedArrayByteCode.ArrayBuffer) {
      return tarr.buffer;
    }
    return tarr;
  } else {
    const tarr = new TypedArrayConstructor(len);
    const view = new DataView(stream.readBytes(bytesPerElement * len).buffer);
    for (let i = 0; i < len; i += 1) {
      tarr[i] = view[dataGetterName](i * bytesPerElement, true);
    }
    if (typeByte === ETypedArrayByteCode.ArrayBuffer) {
      return tarr.buffer;
    }
    return tarr;
  }
};

// src/decoder/decode.ts
var decode = (typeByte, stream, options) => {
  const { refs, refByteSlice } = options.context;
  if (typeByte === null) {
    typeByte = stream.readByte();
  }
  const type = typeByte & 240;
  const isRefEnabled = !(type === 176 /* Refs */);
  const refId = refs.length;
  let isRefAllowed = true;
  if (isRefEnabled) {
    refs.push(void 0);
    refByteSlice.push({
      index: stream.getReadBytesIndex() - 1,
      length: 0
    });
  }
  let result;
  let isResultReceived = false;
  switch (type) {
    case 176 /* Refs */: {
      result = decodeRef(typeByte, stream, options);
      isResultReceived = true;
      isRefAllowed = false;
      break;
    }
    case 0 /* Constant */: {
      result = decodeConstant(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = false;
      break;
    }
    case 16 /* String */: {
      result = decodeString(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = result.length > 2;
      break;
    }
    case 32 /* Integer */: {
      result = decodeInteger(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = result > 255 || result < -255;
      break;
    }
    case 48 /* Float */: {
      result = decodeFloat(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 64 /* BigInt */: {
      result = decodeBigInt(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 80 /* Array */: {
      result = decodeArray(typeByte, stream, options, refs[refId] = []);
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 96 /* Typed_Array */: {
      result = decodeTypedArray(typeByte, stream, options);
      isResultReceived = true;
      break;
    }
    case 112 /* Object */: {
      result = decodeObject(typeByte, stream, options, refs[refId] = {});
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 128 /* Set */: {
      result = decodeSet(typeByte, stream, options, refs[refId] = /* @__PURE__ */ new Set());
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 144 /* Map */: {
      result = decodeMap(typeByte, stream, options, refs[refId] = /* @__PURE__ */ new Map());
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 160 /* Symbol */: {
      result = decodeSymbol(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 192 /* Date */: {
      result = decodeDate(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = Math.abs(result.getTime()) > 255;
      break;
    }
    case 240 /* Instruction */: {
      switch (typeByte) {
        case 240 /* Instruction */ | 240: {
          result = decodePrimitiveObjectWrapper(typeByte, stream, options);
          isResultReceived = true;
          isRefAllowed = true;
          break;
        }
        default: {
          throw new Error(`Not supported instruction ${typeByte}`);
        }
      }
      break;
    }
  }
  if (isResultReceived === false) {
    throw new Error(`Unsupported decoding value: "${typeByte}"`);
  }
  if (isRefEnabled) {
    if (isRefAllowed) {
      refs[refId] = result;
      refByteSlice[refId].length = stream.getReadBytesIndex() - refByteSlice[refId].index;
    } else {
      refs.pop();
      refByteSlice.pop();
    }
  }
  return result;
};

// src/decoder/decodeIntegerStream.ts
var decodeIntegerStream = async (typeByte, stream) => {
  if ((typeByte & 240) !== 32 /* Integer */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding integer`);
  }
  const count = typeByte & 7;
  const isNegative = Boolean(typeByte & 8);
  if (count === 0) {
    return isNegative ? -0 : 0;
  }
  const bytesCount = await stream.readStreamBytes(count);
  const int = bytesToInteger(bytesCount);
  return isNegative ? -int : int;
};

// src/decoder/decodeArrayStream.ts
var decodeArrayStream = async (typeByte, stream, options, initArr = []) => {
  if ((typeByte & 240) !== 80 /* Array */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding array`);
  }
  const isKeyValueEncoding = typeByte & 8;
  const bytesCount = typeByte & 7;
  if (bytesCount === 0) {
    return initArr;
  }
  const arrayLen = bytesToInteger(await stream.readStreamBytes(bytesCount));
  const itemsCoint = isKeyValueEncoding ? bytesToInteger(await stream.readStreamBytes(bytesCount)) : arrayLen;
  const arr = initArr;
  arr.length = arrayLen;
  if (isKeyValueEncoding) {
    for (let i = 0; i < itemsCoint; i += 1) {
      const key = await decodeIntegerStream(await stream.readStreamByte(), stream);
      const value = await decodeStream(await stream.readStreamByte(), stream, options);
      arr[key] = value;
    }
  } else {
    for (let i = 0; i < arrayLen; i += 1) {
      const byte = await stream.readStreamByte();
      if (byte === EConstantByteCode.Empty_Value) {
        continue;
      }
      const value = await decodeStream(byte, stream, options);
      arr[i] = value;
    }
  }
  return arr;
};

// src/decoder/decodeBigIntStream.ts
var decodeBigIntStream = async (typeByte, stream) => {
  if ((typeByte & 240) !== 64 /* BigInt */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding bigint`);
  }
  const count = typeByte & 7;
  const isNegative = Boolean(typeByte & 8);
  if (count === 0) {
    return isNegative ? -0n : 0n;
  }
  const bytesCount = await stream.readStreamBytes(count);
  const encodeCount = bytesToInteger(bytesCount);
  const encodeBytes = await stream.readStreamBytes(encodeCount);
  const bint = bytesToBigInt(encodeBytes);
  return isNegative ? -bint : bint;
};

// src/decoder/decodeConstantStream.ts
var decodeConstantStream = async (typeByte, stream) => {
  if ((typeByte & 240) !== 0 /* Constant */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding contant`);
  }
  if (!constantMap.has(typeByte)) {
    throw new Error("Not supported contsant for decoding");
  }
  return constantMap.get(typeByte);
};

// src/decoder/decodeDateStream.ts
var decodeDateStream = async (typeByte, stream) => {
  if ((typeByte & 240) !== 192 /* Date */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding Date`);
  }
  const count = typeByte & 7;
  const isNegative = Boolean(typeByte & 8);
  if (count === 0) {
    return /* @__PURE__ */ new Date(0);
  }
  const bytesCount = await stream.readStreamBytes(count);
  const int = bytesToInteger(bytesCount);
  return new Date(isNegative ? -int : int);
};

// src/decoder/decodeFloatStream.ts
var decodeFloatStream = async (typeByte, stream) => {
  if ((typeByte & 240) !== 48 /* Float */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding float`);
  }
  const count = (typeByte & 7) + 1;
  let map = 0;
  if (typeByte & 8) {
    map = await stream.readStreamByte();
  } else {
    for (let i = 0; i < count; i += 1) {
      map = map | 1 << i;
    }
  }
  const bytesCount = await stream.readStreamBytes(count);
  const floatBytes = new Uint8Array(8);
  let byteIndex = 0;
  for (let i = 0; i < 8; i += 1) {
    if (map & 128 >>> i) {
      floatBytes[i] = bytesCount[byteIndex];
      byteIndex += 1;
    }
  }
  const float = new Float64Array(floatBytes.buffer);
  return float[0];
};

// src/decoder/decodeMapStream.ts
var decodeMapStream = async (typeByte, stream, options, initMap = /* @__PURE__ */ new Map()) => {
  if ((typeByte & 240) !== 144 /* Map */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding map`);
  }
  const bytesCount = typeByte & 7;
  if (bytesCount === 0) {
    return initMap;
  }
  const count = bytesToInteger(await stream.readStreamBytes(bytesCount));
  const map = initMap;
  for (let i = 0; i < count; i += 1) {
    const key = await decodeStream(await stream.readStreamByte(), stream, options);
    const value = await decodeStream(await stream.readStreamByte(), stream, options);
    map.set(key, value);
  }
  return map;
};

// src/decoder/decodeObjectStream.ts
var decodeObjectStream = async (typeByte, stream, options, initObj = {}) => {
  if ((typeByte & 240) !== 112 /* Object */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding object`);
  }
  const bytesCount = typeByte & 7;
  if (bytesCount === 0) {
    return initObj;
  }
  const count = bytesToInteger(await stream.readStreamBytes(bytesCount));
  const isClassInstance2 = Boolean(typeByte & 8);
  const constructorName = isClassInstance2 ? await decodeStream(null, stream, options) : null;
  const obj = initObj;
  for (let i = 0; i < count; i += 1) {
    const key = await decodeStream(null, stream, options);
    const value = await decodeStream(null, stream, options);
    obj[key] = value;
  }
  if (isClassInstance2) {
    const constructorNameKey = options.objects.classInstanceConstructorNameKey;
    if (constructorNameKey !== null) {
      const classConstructor = options.objects.factories[constructorName];
      if (classConstructor) {
        Object.setPrototypeOf(obj, classConstructor.prototype);
      } else {
        Object.defineProperty(obj, constructorNameKey, {
          value: constructorName,
          configurable: true,
          enumerable: false,
          writable: false
        });
      }
    }
  }
  return obj;
};

// src/decoder/decodePrimitiveObjectWrapperStream.ts
var decodePrimitiveObjectWrapperStream = async (typeByte, stream, options) => {
  if (typeByte !== (240 /* Instruction */ | 0)) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding primitive object wrapper`);
  }
  const value = await decodeStream(null, stream, options);
  switch (typeof value) {
    case "string":
      return new String(value);
    case "boolean":
      return new Boolean(value);
    case "number":
      return new Number(value);
  }
  throw new Error(`Can not create Primitive Object Wrapper for value ${value}, type ${typeof value}`);
};

// src/decoder/decodeRefStream.ts
var decodeRefStream = async (typeByte, stream, options) => {
  if ((typeByte & 240) !== 176 /* Refs */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding ref`);
  }
  const isCopy = Boolean(typeByte & 8);
  const count = typeByte & 7;
  const id = count === 0 ? 0 : bytesToInteger(await stream.readStreamBytes(count));
  const refs = options.context.refs;
  if (!(id in refs)) {
    throw new Error(`Incorrect ref ID ${id}, max id is ${refs.length}`);
  }
  if (isCopy) {
    const refSlice = options.context.refByteSlice[id];
    const slice = options.context.readBytes.slice(refSlice.index, refSlice.index + refSlice.length);
    const decOptions = createDecodeOptions();
    decOptions.context = options.context;
    const st = new ByteStream(slice);
    st.completeStream();
    const copy = decode(null, st, decOptions);
    return copy;
  }
  return refs[id];
};

// src/decoder/decodeSetStream.ts
var decodeSetStream = async (typeByte, stream, options, initSet = /* @__PURE__ */ new Set()) => {
  if ((typeByte & 240) !== 128 /* Set */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding set`);
  }
  const bytesCount = typeByte & 7;
  if (bytesCount === 0) {
    return initSet;
  }
  const count = bytesToInteger(await stream.readStreamBytes(bytesCount));
  const set = initSet;
  for (let i = 0; i < count; i += 1) {
    const value = await decodeStream(await stream.readStreamByte(), stream, options);
    set.add(value);
  }
  return set;
};

// src/decoder/decodeStringStream.ts
var decodeStringStream = async (typeByte, stream) => {
  if ((typeByte & 240) !== 16 /* String */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding string`);
  }
  const count = typeByte & 7;
  if (count === 0) {
    return "";
  }
  const bytesCount = await stream.readStreamBytes(count);
  const bytesLength = bytesToInteger(bytesCount);
  const decoder = new TextDecoder("utf-8");
  const bytes = await stream.readStreamBytes(bytesLength);
  return decoder.decode(bytes);
};

// src/decoder/decodeSymbolStream.ts
var decodeSymbolStream = async (typeByte, stream) => {
  if ((typeByte & 240) !== 160 /* Symbol */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding symbol`);
  }
  const count = typeByte & 7;
  if (count === 0) {
    return /* @__PURE__ */ Symbol.for("");
  }
  const bytesCount = await stream.readStreamBytes(count);
  const strLen = bytesToInteger(bytesCount);
  const bytes = await stream.readStreamBytes(strLen);
  return Symbol.for(bytesToUtf16(bytes));
};

// src/decoder/decodeTypedArrayStream.ts
var decodeTypedArrayStream = async (typeByte, stream, options) => {
  if ((typeByte & 240) !== 96 /* Typed_Array */) {
    throw new Error(`Provaded incorrect type ${typeByte} for decoding typed array`);
  }
  const secondByte = await stream.readStreamByte();
  const isKeyValueEncoding = secondByte & 64;
  const itemsBytesCount = secondByte & 7;
  const lengthBytesCount = (secondByte & 56) >>> 3;
  const TypedArrayConstructor = typedArrayConstructorByType[typeByte];
  const tarr0 = new TypedArrayConstructor(0);
  const bytesPerElement = getBytesPerElement(tarr0);
  const len = isKeyValueEncoding ? bytesToInteger(await stream.readStreamBytes(lengthBytesCount)) : bytesToInteger(await stream.readStreamBytes(itemsBytesCount));
  const count = isKeyValueEncoding ? bytesToInteger(await stream.readStreamBytes(itemsBytesCount)) : len;
  const dataGetterName = dataViewGetter[typeByte];
  if (isKeyValueEncoding) {
    const tarr = new TypedArrayConstructor(Math.round(len / bytesPerElement));
    for (let i = 0; i < count; i += 1) {
      const key = await decodeIntegerStream(await stream.readStreamByte(), stream);
      const valueBytes = await stream.readStreamBytes(bytesPerElement);
      const view = new DataView(valueBytes.buffer);
      tarr[key] = view[dataGetterName](0, true);
    }
    if (typeByte === ETypedArrayByteCode.ArrayBuffer) {
      return tarr.buffer;
    }
    return tarr;
  } else {
    const tarr = new TypedArrayConstructor(len);
    const view = new DataView((await stream.readStreamBytes(bytesPerElement * len)).buffer);
    for (let i = 0; i < len; i += 1) {
      tarr[i] = view[dataGetterName](i * bytesPerElement, true);
    }
    if (typeByte === ETypedArrayByteCode.ArrayBuffer) {
      return tarr.buffer;
    }
    return tarr;
  }
};

// src/decoder/decodeStream.ts
var decodeStream = async (typeByte, stream, options) => {
  const { refs, refByteSlice } = options.context;
  if (typeByte === null) {
    typeByte = await stream.readStreamByte();
  }
  const type = typeByte & 240;
  const isRefEnabled = !(type === 176 /* Refs */);
  const refId = refs.length;
  let isRefAllowed = true;
  if (isRefEnabled) {
    refs.push(void 0);
    refByteSlice.push({
      index: stream.getReadBytesIndex() - 1,
      length: 0
    });
  }
  let result;
  let isResultReceived = false;
  switch (type) {
    case 176 /* Refs */: {
      result = await decodeRefStream(typeByte, stream, options);
      isResultReceived = true;
      isRefAllowed = false;
      break;
    }
    case 0 /* Constant */: {
      result = await decodeConstantStream(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = false;
      break;
    }
    case 16 /* String */: {
      result = await decodeStringStream(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = result.length > 2;
      break;
    }
    case 32 /* Integer */: {
      result = await decodeIntegerStream(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = result > 255 || result < -255;
      break;
    }
    case 48 /* Float */: {
      result = await decodeFloatStream(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 64 /* BigInt */: {
      result = await decodeBigIntStream(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 80 /* Array */: {
      result = await decodeArrayStream(typeByte, stream, options, refs[refId] = []);
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 96 /* Typed_Array */: {
      result = await decodeTypedArrayStream(typeByte, stream, options);
      isResultReceived = true;
      break;
    }
    case 112 /* Object */: {
      result = await decodeObjectStream(typeByte, stream, options, refs[refId] = {});
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 128 /* Set */: {
      result = await decodeSetStream(typeByte, stream, options, refs[refId] = /* @__PURE__ */ new Set());
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 144 /* Map */: {
      result = await decodeMapStream(typeByte, stream, options, refs[refId] = /* @__PURE__ */ new Map());
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 160 /* Symbol */: {
      result = await decodeSymbolStream(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = true;
      break;
    }
    case 192 /* Date */: {
      result = await decodeDateStream(typeByte, stream);
      isResultReceived = true;
      isRefAllowed = Math.abs(result.getTime()) > 255;
      break;
    }
    case 240 /* Instruction */: {
      switch (typeByte) {
        case 240 /* Instruction */ | 240: {
          result = await decodePrimitiveObjectWrapperStream(typeByte, stream, options);
          isResultReceived = true;
          isRefAllowed = true;
          break;
        }
        default: {
          throw new Error(`Not supported instruction ${typeByte}`);
        }
      }
      break;
    }
  }
  if (isResultReceived === false) {
    throw new Error(`Unsupported decoding value: "${typeByte}"`);
  }
  if (isRefEnabled) {
    if (isRefAllowed) {
      refs[refId] = result;
      refByteSlice[refId].length = stream.getReadBytesIndex() - refByteSlice[refId].index;
    } else {
      refs.pop();
      refByteSlice.pop();
    }
  }
  return result;
};

// src/utils/vars/isClassInstance.ts
var isClassInstance = (value) => {
  return typeof value === "object" && value && !Array.isArray(value) && value?.constructor?.name && value.constructor.name !== "Object";
};

// src/utils/vars/isFloat.ts
var isFloat = (value) => {
  return typeof value === "number" && !Number.isInteger(value) && Number.isFinite(value);
};

// src/utils/vars/isInteger.ts
var isInteger = (value) => {
  return typeof value === "number" && Number.isInteger(value);
};

// src/utils/vars/isMap.ts
var isMap = (value) => {
  return value instanceof Map;
};

// src/utils/vars/isObject.ts
var isObject = (value) => {
  return typeof value === "object" && value && !Array.isArray(value) && value?.constructor?.name === "Object";
};

// src/utils/vars/isPrimitiveObjectWrapper.ts
var isPrimitiveObjectWrapper = (value) => {
  return value instanceof Number || value instanceof String || value instanceof Boolean;
};

// src/utils/vars/isSet.ts
var isSet = (value) => {
  return value instanceof Set;
};

// src/utils/vars/isTypedArray.ts
var isTypedArray = (value) => {
  return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer || typeof Int8Array !== "undefined" && value instanceof Int8Array || typeof Uint8Array !== "undefined" && value instanceof Uint8Array || typeof Uint8ClampedArray !== "undefined" && value instanceof Uint8ClampedArray || typeof Int16Array !== "undefined" && value instanceof Int16Array || typeof Uint16Array !== "undefined" && value instanceof Uint16Array || typeof Int32Array !== "undefined" && value instanceof Int32Array || typeof Uint32Array !== "undefined" && value instanceof Uint32Array || typeof Float32Array !== "undefined" && value instanceof Float32Array || typeof Float64Array !== "undefined" && value instanceof Float64Array || typeof BigInt64Array !== "undefined" && value instanceof BigInt64Array || typeof BigUint64Array !== "undefined" && value instanceof BigUint64Array;
};

// src/constants.ts
var MAX_7_BYTES_INTEGER = 9007199254740991;
var MAX_DATE_INTEGER = 864e13;

// src/converter/integerToBytes.ts
var UINT32_MAX = 4294967295;
var integerToBytes = (num, byteSize = 0) => {
  if (num < 0) {
    throw new Error("integerToBytes does not support negative integers");
  }
  const bytes = [];
  if (num <= UINT32_MAX) {
    while (num > 0) {
      bytes.push(num & 255);
      num >>>= 8;
    }
  } else {
    while (num > 0) {
      const n = num % 256;
      bytes.push(n);
      num = Math.floor((num - n) / 256);
    }
  }
  if (byteSize !== 0) {
    let count = byteSize - bytes.length;
    while (count > 0) {
      bytes.push(0);
      count -= 1;
    }
  }
  return bytes;
};

// src/utils/arrays/getFilledItemsCount.ts
var getFilledItemsCount = (arr) => {
  let count = 0;
  arr.forEach(() => {
    count += 1;
  });
  return count;
};

// src/utils/toChar.ts
var toChar = (...codes) => {
  return String.fromCharCode(...codes);
};

// src/encoder/encodeEmptyValue.ts
var EMPTY_VALUE_BYTE_CHR = toChar(EConstantByteCode.Empty_Value);
var encodeEmptyValue = () => {
  return EMPTY_VALUE_BYTE_CHR;
};

// src/encoder/encodeInteger.ts
var POS_ZERO_BYTE_CHAR = toChar(32 /* Integer */ & 240);
var NEG_ZERO_BYTE_CHAR = toChar(32 /* Integer */ & 240 | 8);
var encodeInteger = (value) => {
  if (!isInteger(value)) {
    throw new Error(`Expecting "integer" type, received "${value}" (${typeof value})`);
  }
  if (Math.abs(value) > MAX_7_BYTES_INTEGER) {
    throw new Error(`Can not encode unsafe integer`);
  }
  if (value === 0) {
    return Object.is(value, 0) ? POS_ZERO_BYTE_CHAR : NEG_ZERO_BYTE_CHAR;
  }
  const msg = [];
  const val = Math.abs(value);
  const isPositive = value > 0;
  const bytes = integerToBytes(val);
  msg.push(toChar(32 /* Integer */ | (7 & bytes.length | (isPositive ? 0 : 8))));
  msg.push(toChar(...bytes));
  return msg.join("");
};

// src/encoder/encodeArray.ts
var EMPTY_ARRAY_BYTE_CHAR = toChar(80 /* Array */ & 240);
var SPARSE_RATE = 0.5;
var encodeArray = (arr, options) => {
  if (!Array.isArray(arr)) {
    throw new Error(`Expecting "array" type, received "${arr}" (${typeof arr})`);
  }
  if (arr.length === 0) {
    return EMPTY_ARRAY_BYTE_CHAR;
  }
  if (arr.length > MAX_7_BYTES_INTEGER) {
    throw new Error(`Provided array has too large length, limit ${MAX_7_BYTES_INTEGER}, received ${arr.length}`);
  }
  const filledCount = getFilledItemsCount(arr);
  const isSparseEncoding = filledCount / arr.length < SPARSE_RATE;
  const bytes = integerToBytes(arr.length);
  const msg = [];
  msg.push(toChar(
    80 /* Array */ | (7 & bytes.length | (isSparseEncoding ? 8 : 0))
  ));
  msg.push(toChar(...bytes));
  if (isSparseEncoding) {
    const countBytes = integerToBytes(filledCount, bytes.length);
    msg.push(toChar(...countBytes));
    arr.forEach((item, index) => {
      msg.push(encodeInteger(index));
      msg.push(encode(item, options));
    });
  } else {
    for (let i = 0; i < arr.length; i += 1) {
      const isEmptyValue = !(String(i) in arr);
      msg.push(isEmptyValue ? encodeEmptyValue() : encode(arr[i], options));
    }
  }
  return msg.join("");
};

// src/converter/bigIntToBytes.ts
var bigIntToBytes = (bint, byteSize = 0, bigEndianOrder = false) => {
  if (bint < 0 && !byteSize) {
    throw new Error(`byteSize param should be provided for negative bigInt ${bint}`);
  }
  const bytes = [];
  let num = bint < 0 ? -(bint + 1n) : bint;
  for (let i = 1; byteSize ? i <= byteSize : num; i += 1) {
    bytes.push(num & 0xFFn);
    num = num >> 8n;
  }
  if (bint < 0) {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = 255n - bytes[i];
    }
  }
  return bigEndianOrder ? bytes.reverse() : bytes;
};

// src/utils/vars/isBigInt.ts
var isBigInt = (value) => {
  return typeof value === "bigint";
};

// src/encoder/encodeBigInt.ts
var ZERO_BYTE_CHAR = toChar(64 /* BigInt */ & 240);
var encodeBigInt = (value) => {
  if (!isBigInt(value)) {
    throw new Error(`Expecting "bigint" type, received "${value}" (${typeof value})`);
  }
  if (value === 0n) {
    return ZERO_BYTE_CHAR;
  }
  const val = value < 0n ? -value : value;
  const isPositive = value > 0;
  const msg = [];
  const bytes = bigIntToBytes(val);
  const lenBytes = integerToBytes(bytes.length);
  msg.push(toChar(
    64 /* BigInt */ | 7 & lenBytes.length | (isPositive ? 0 : 8)
  ));
  msg.push(toChar(...lenBytes));
  msg.push(toChar(...bytes.map((i) => Number(i))));
  return msg.join("");
};

// src/encoder/encodeBoolean.ts
var TRUE_BYTE_CHR = toChar(EConstantByteCode.TRUE);
var FALSE_BYTE_CHR = toChar(EConstantByteCode.FALSE);
var encodeBoolean = (value) => {
  if (typeof value !== "boolean") {
    throw new Error(`Expecting "boolean" type, received "${value}" (${typeof value})`);
  }
  return value ? TRUE_BYTE_CHR : FALSE_BYTE_CHR;
};

// src/encoder/encodeClassInstance.ts
var encodeClassInstance = (obj, options) => {
  if (!isClassInstance(obj)) {
    throw new Error(`Expecting "object" type, received "${obj}" (${typeof obj})`);
  }
  const props = typeof obj?.toJSBT === "function" ? obj.toJSBT() : typeof obj?.toJSON === "function" ? obj.toJSON() : obj.valueOf();
  const msgBody = [];
  let count = 0;
  const constructorNameKey = options.objects.classInstanceConstructorNameKey;
  const constructorName = constructorNameKey && (props[constructorNameKey] || obj[constructorNameKey]) || obj?.constructor?.name || "";
  msgBody.push(encode(constructorName, options));
  for (const key in props) {
    if (!props.hasOwnProperty(key)) {
      continue;
    }
    msgBody.push(encode(key, options));
    msgBody.push(encode(props[key], options));
    count += 1;
  }
  for (const sym of Object.getOwnPropertySymbols(props)) {
    msgBody.push(encode(sym, options));
    msgBody.push(encode(props[sym], options));
    count += 1;
  }
  if (count > MAX_7_BYTES_INTEGER) {
    throw new Error(`Provided object has too many props, limit ${MAX_7_BYTES_INTEGER}, received ${count}`);
  }
  const msgHeaders = [];
  const countBytes = integerToBytes(count);
  msgHeaders.push(
    toChar(
      112 /* Object */ | 8 | // Class Instance
      7 & countBytes.length
    )
  );
  msgHeaders.push(toChar(...countBytes));
  return msgHeaders.join("") + msgBody.join("");
};

// src/encoder/encodeDate.ts
var ZERO_BYTE_CHAR2 = toChar(192 /* Date */ & 240);
var encodeDate = (value, options) => {
  if (!(value instanceof Date)) {
    throw new Error(`Expecting "Date" type, received "${value}" (${typeof value})`);
  }
  const ms = value.getTime();
  if (Math.abs(ms) > MAX_DATE_INTEGER) {
    throw new Error(`Can not encode invalid date`);
  }
  if (ms === 0) {
    return ZERO_BYTE_CHAR2;
  }
  const msg = [];
  const val = Math.abs(ms);
  const isPositive = ms > 0;
  const bytes = integerToBytes(val);
  msg.push(toChar(192 /* Date */ | (7 & bytes.length | (isPositive ? 0 : 8))));
  msg.push(toChar(...bytes));
  return msg.join("");
};

// src/converter/doubleToBytes.ts
var _buffer = new ArrayBuffer(8);
var _float64 = new Float64Array(_buffer);
var _uint8 = new Uint8Array(_buffer);
var doubleToBytes = (value, bigEndianOrder = false) => {
  _float64[0] = value;
  if (!bigEndianOrder) {
    return [
      _uint8[0],
      _uint8[1],
      _uint8[2],
      _uint8[3],
      _uint8[4],
      _uint8[5],
      _uint8[6],
      _uint8[7]
    ];
  }
  return [
    _uint8[7],
    _uint8[6],
    _uint8[5],
    _uint8[4],
    _uint8[3],
    _uint8[2],
    _uint8[1],
    _uint8[0]
  ];
};

// src/encoder/encodeFloat.ts
var encodeFloat = (value, mapping = true) => {
  if (!isFloat(value)) {
    throw new Error(`Expecting "float" type, received "${value}" (${typeof value})`);
  }
  const bytes = doubleToBytes(value);
  let start = 0;
  while (start < 8 && bytes[start] === 0) start++;
  const trimmedLen = 8 - start;
  if (trimmedLen <= 0) {
    throw new Error("Float(0) must be encoded as Integer(0)");
  }
  let byteMap = 0;
  let mappedCount = 0;
  if (mapping) {
    for (let i = 0; i < 8; i++) {
      const b = bytes[i];
      if (b !== 0) {
        byteMap |= 1 << 7 - i;
        mappedCount++;
      }
    }
  }
  const isMapping = !!(mapping && byteMap && mappedCount < trimmedLen - 1);
  const payloadLen = isMapping ? mappedCount : trimmedLen;
  const msg = new Array(isMapping ? 3 : 2);
  msg[0] = toChar(
    48 /* Float */ | 7 & payloadLen - 1 | (isMapping ? 8 : 0)
  );
  let idx = 1;
  if (isMapping) {
    msg[idx] = toChar(byteMap);
    idx += 1;
    const out = new Array(mappedCount);
    let j = 0;
    for (let i = 0; i < 8; i++) {
      const b = bytes[i];
      if (b !== 0) out[j++] = b;
    }
    msg[idx] = toChar(...out);
  } else {
    const out = new Array(trimmedLen);
    for (let i = 0; i < trimmedLen; i++) {
      out[i] = bytes[start + i];
    }
    msg[idx] = toChar(...out);
  }
  return msg.join("");
};

// src/encoder/encodeInfinity.ts
var POS_INFINITY_CHR = toChar(EConstantByteCode.Pos_Infinity);
var NEG_INFINITY_CHR = toChar(EConstantByteCode.Neg_Infinity);
var encodeInfinity = (value) => {
  if (value !== Infinity && value !== -Infinity) {
    throw new Error(`Expecting "Infinity", received "${value}" (${typeof value})`);
  }
  return value > 0 ? POS_INFINITY_CHR : NEG_INFINITY_CHR;
};

// src/encoder/encodeMap.ts
var EMPTY_MAP_BYTE_CHAR = toChar(144 /* Map */ & 240);
var encodeMap = (map, options) => {
  if (!isMap(map)) {
    throw new Error(`Expecting "map" type, received "${map}" (${typeof map})`);
  }
  if (map.size === 0) {
    return EMPTY_MAP_BYTE_CHAR;
  }
  if (map.size > MAX_7_BYTES_INTEGER) {
    throw new Error(`Provided map has too many items, limit ${MAX_7_BYTES_INTEGER}, received ${map.size}`);
  }
  const sizeBytes = integerToBytes(map.size);
  const msg = [];
  msg.push(toChar(
    144 /* Map */ | 7 & sizeBytes.length
  ));
  msg.push(toChar(...sizeBytes));
  map.forEach((value, key) => {
    msg.push(encode(key, options));
    msg.push(encode(value, options));
  });
  return msg.join("");
};

// src/encoder/encodeNaN.ts
var NAN_BYTE = toChar(EConstantByteCode.NaN);
var encodeNaN = () => {
  return NAN_BYTE;
};

// src/encoder/encodeNull.ts
var NULL_BYTE = toChar(EConstantByteCode.Null);
var encodeNull = () => {
  return NULL_BYTE;
};

// src/encoder/encodeObject.ts
var EMPTY_OBJECT_BYTE_CHAR = toChar(112 /* Object */ & 240);
var encodeObject = (obj, options) => {
  if (!isObject(obj)) {
    throw new Error(`Expecting "object" type, received "${obj}" (${typeof obj})`);
  }
  const msgBody = [];
  let count = 0;
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    msgBody.push(encode(key, options));
    msgBody.push(encode(obj[key], options));
    count += 1;
  }
  for (const sym of Object.getOwnPropertySymbols(obj)) {
    msgBody.push(encode(sym, options));
    msgBody.push(encode(obj[sym], options));
    count += 1;
  }
  if (count === 0) {
    return EMPTY_OBJECT_BYTE_CHAR;
  }
  if (count > MAX_7_BYTES_INTEGER) {
    throw new Error(`Provided object has too many props, limit ${MAX_7_BYTES_INTEGER}, received ${count}`);
  }
  const msgHeaders = [];
  const countBytes = integerToBytes(count);
  msgHeaders.push(toChar(
    112 /* Object */ | 7 & countBytes.length
  ));
  msgHeaders.push(toChar(...countBytes));
  return msgHeaders.join("") + msgBody.join("");
};

// src/encoder/encodePrimitiveObjectWrapper.ts
var encodePrimitiveObjectWrapper = (obj, options) => {
  if (!isPrimitiveObjectWrapper(obj)) {
    throw new Error(`Expecting Promitive Object Wrapper, received "${obj}" (${typeof obj})`);
  }
  const msg = [];
  msg.push(toChar(240 /* Instruction */ & 240));
  msg.push(encode(obj.valueOf(), options));
  return msg.join("");
};

// src/encoder/encodeRef.ts
var encodeRef = (mode, refId, options) => {
  if (!isInteger(refId)) {
    throw new Error(`Expecting "integer" type, received "${refId}" (${typeof refId})`);
  }
  if (Math.abs(refId) > MAX_7_BYTES_INTEGER) {
    throw new Error(`Can not encode unsafe integer`);
  }
  const msg = [];
  const bytes = integerToBytes(refId);
  msg.push(toChar(
    176 /* Refs */ | (mode === "copy" ? 8 : 0) | 7 & bytes.length
  ));
  msg.push(toChar(...bytes));
  return msg.join("");
};

// src/encoder/encodeSet.ts
var EMPTY_SET_BYTE_CHAR = toChar(128 /* Set */ & 240);
var encodeSet = (set, options) => {
  if (!isSet(set)) {
    throw new Error(`Expecting "set" type, received "${set}" (${typeof set})`);
  }
  if (set.size === 0) {
    return EMPTY_SET_BYTE_CHAR;
  }
  if (set.size > MAX_7_BYTES_INTEGER) {
    throw new Error(`Provided set has too many items, limit ${MAX_7_BYTES_INTEGER}, received ${set.size}`);
  }
  const sizeBytes = integerToBytes(set.size);
  const msg = [];
  msg.push(toChar(
    128 /* Set */ | 7 & sizeBytes.length
  ));
  msg.push(toChar(...sizeBytes));
  set.forEach((value) => {
    msg.push(encode(value, options));
  });
  return msg.join("");
};

// src/encoder/encodeString.ts
var EMPTY_STRING_BYTE_CHAR = toChar(16 /* String */ & 240);
var encodeString = (value) => {
  if (typeof value !== "string") {
    throw new Error(`Expecting "string" type, received "${value}" (${typeof value})`);
  }
  if (value === "") {
    return EMPTY_STRING_BYTE_CHAR;
  }
  const msg = [];
  const encoder = new TextEncoder();
  const encodeBytes = encoder.encode(value);
  if (encodeBytes.byteLength > MAX_7_BYTES_INTEGER) {
    throw new Error(`Too large string. ${encodeBytes.byteLength} bytes, limit ${MAX_7_BYTES_INTEGER}`);
  }
  const bytes = integerToBytes(encodeBytes.byteLength);
  msg.push(toChar(16 /* String */ | 7 & bytes.length));
  msg.push(toChar(...bytes));
  msg.push(toChar(...encodeBytes));
  return msg.join("");
};

// src/converter/getBytesSizeForString.ts
var getBytesSizeForString = (str) => {
  let size = 0;
  for (let i = 0; i < str.length; i += 1) {
    const chr = str[i];
    for (let codeAt = 0; codeAt < 2; codeAt += 1) {
      const code = chr.charCodeAt(codeAt);
      if (isNaN(code)) {
        continue;
      }
      if (code < 256) {
        size += 1;
      } else {
        size += 2;
      }
    }
  }
  return size;
};

// src/encoder/encodeSymbol.ts
var encodeSymbol = (value) => {
  if (typeof value !== "symbol") {
    throw new Error(`Expecting "symbol" type, received "${String(value)}" (${typeof value})`);
  }
  const msg = [];
  const key = Symbol.keyFor(value);
  if (key === void 0) {
    throw new Error(`Not found key for symbol ${String(value)}`);
  }
  const bytesCount = getBytesSizeForString(key);
  if (bytesCount > MAX_7_BYTES_INTEGER) {
    throw new Error(`Too large symbol key. ${bytesCount} bytes, limit ${MAX_7_BYTES_INTEGER}`);
  }
  const bytes = integerToBytes(bytesCount);
  msg.push(toChar(160 /* Symbol */ | 7 & bytes.length));
  if (bytes.length) {
    msg.push(toChar(...bytes));
  }
  if (key) {
    msg.push(key);
  }
  return msg.join("");
};

// src/utils/typedArrays/getFilledItemsCount.ts
var getFilledItemsCount2 = (arr) => {
  let count = 0;
  const tarr = arr instanceof ArrayBuffer ? new Uint8Array(arr) : arr;
  tarr.forEach((item) => {
    if (item !== 0) {
      count += 1;
    }
  });
  return count;
};

// src/utils/typedArrays/calculateByteCountVariants.ts
var calculateByteCountVariants = (tarr) => {
  const arr = tarr instanceof ArrayBuffer ? new Uint8Array(tarr) : tarr;
  const bytesPerElement = getBytesPerElement(arr);
  const resutls = {
    envValueSize: arr.byteLength,
    encKeyValueSize: 0
  };
  for (let i = 0; i < arr.length; i += 1) {
    const num = arr[i];
    if (num) {
      const bytes = integerToBytes(i);
      resutls.encKeyValueSize += /* type */
      1 + /* int */
      +(i > 0 ? bytes.length : 0) + bytesPerElement;
    }
  }
  return resutls;
};

// src/encoder/encodeTypedArray.ts
var TYPED_ARRAY_CHAR_BY_NAME = {
  ArrayBuffer: ETypedArrayByteCode.ArrayBuffer,
  Int8Array: ETypedArrayByteCode.Int8Array,
  Uint8Array: ETypedArrayByteCode.Uint8Array,
  Uint8ClampedArray: ETypedArrayByteCode.Uint8ClampedArray,
  Int16Array: ETypedArrayByteCode.Int16Array,
  Uint16Array: ETypedArrayByteCode.Uint16Array,
  Int32Array: ETypedArrayByteCode.Int32Array,
  Uint32Array: ETypedArrayByteCode.Uint32Array,
  Float32Array: ETypedArrayByteCode.Float32Array,
  Float64Array: ETypedArrayByteCode.Float64Array,
  BigInt64Array: ETypedArrayByteCode.BigInt64Array,
  BigUint64Array: ETypedArrayByteCode.BigUint64Array
};
var encodeTypedArray = (tarr, options) => {
  if (!isTypedArray(tarr)) {
    throw new Error(`Expecting "typedArray" type, received "${tarr}" (${typeof tarr})`);
  }
  const name = tarr.constructor.name;
  const typeCode = TYPED_ARRAY_CHAR_BY_NAME[name];
  if (tarr.byteLength === 0) {
    return toChar(typeCode, 0);
  }
  const arr = tarr instanceof ArrayBuffer ? new Uint8Array(tarr) : tarr;
  const bytesPerElement = getBytesPerElement(tarr);
  const definedItemsCount = getFilledItemsCount2(tarr);
  if (tarr.byteLength > MAX_7_BYTES_INTEGER) {
    throw new Error(
      `Provided typed array has too large length, limit ${MAX_7_BYTES_INTEGER}, received ${tarr.byteLength}`
    );
  }
  const msg = [];
  const calculation = calculateByteCountVariants(tarr);
  const isValueEncoding = calculation.envValueSize <= calculation.encKeyValueSize;
  msg.push(toChar(typeCode));
  const byteLenBytes = integerToBytes(tarr.byteLength);
  const lenBytes = integerToBytes(arr.length);
  const defCountBytes = integerToBytes(definedItemsCount);
  msg.push(
    toChar(
      0 | (isValueEncoding ? 0 : 64) | (isValueEncoding ? 0 : (7 & byteLenBytes.length) << 3) | (isValueEncoding ? 7 & lenBytes.length : 7 & defCountBytes.length)
    )
  );
  if (isValueEncoding) {
    msg.push(toChar(...lenBytes));
    const uint8arr = new Uint8Array(tarr instanceof ArrayBuffer ? tarr : tarr.buffer);
    msg.push(toChar(...uint8arr));
  } else {
    msg.push(toChar(...byteLenBytes));
    msg.push(toChar(...defCountBytes));
    for (let i = 0; i < arr.length; i += 1) {
      const num = arr[i];
      if (num) {
        const uint8arr = new Uint8Array(arr.buffer, i * bytesPerElement, bytesPerElement);
        msg.push(encodeInteger(i));
        msg.push(toChar(...uint8arr));
      }
    }
  }
  return msg.join("");
};

// src/encoder/encodeUndefined.ts
var UNDEFINED_BYTE = toChar(EConstantByteCode.Undefined);
var encodeUndefined = () => {
  return UNDEFINED_BYTE;
};

// src/encoder/encode.ts
var encode = (value, options) => {
  const context = options.context;
  const isRefEnabled = options.refs?.enabled || false;
  let val = value;
  if (isPrimitiveObjectWrapper(value) && options.primitives.objectWrappersAsPrimitiveValue) {
    val = value.valueOf();
  }
  let refData = null;
  if (isRefEnabled) {
    refData = context.refMap.get(val) || null;
    if (refData) {
      if (!refData.encodedRefLink) {
        refData.encodedRefLink = encodeRef("link", refData.refId, options);
      }
      return refData.encodedRefLink;
    } else {
      const refId = context.refMap.size;
      refData = {
        refId,
        encodedRefLink: null,
        encodedRefCopy: null
      };
      context.refMap.set(val, refData);
    }
  }
  let result = null;
  let isRefAllowed = false;
  const type = typeof val;
  switch (type) {
    case "undefined": {
      isRefAllowed = false;
      result = encodeUndefined();
      break;
    }
    case "boolean": {
      isRefAllowed = false;
      result = encodeBoolean(val);
      break;
    }
    case "number": {
      if (isInteger(val)) {
        isRefAllowed = val > 255 || val < -255;
        result = encodeInteger(val);
        break;
      }
      if (isFloat(val)) {
        isRefAllowed = true;
        result = encodeFloat(val);
        break;
      }
      if (Number.isNaN(val)) {
        isRefAllowed = false;
        result = encodeNaN();
        break;
      }
      if (val === Infinity || val === -Infinity) {
        isRefAllowed = false;
        result = encodeInfinity(val);
        break;
      }
      break;
    }
    case "string": {
      isRefAllowed = val.length > 2;
      result = encodeString(val);
      break;
    }
    case "object": {
      if (val === null) {
        isRefAllowed = false;
        result = encodeNull();
        break;
      }
      if (Array.isArray(val)) {
        isRefAllowed = true;
        result = encodeArray(val, options);
        break;
      }
      if (isObject(val)) {
        isRefAllowed = true;
        result = encodeObject(val, options);
        break;
      }
      if (isSet(val)) {
        isRefAllowed = true;
        result = encodeSet(val, options);
        break;
      }
      if (isMap(val)) {
        isRefAllowed = true;
        result = encodeMap(val, options);
        break;
      }
      if (isTypedArray(val)) {
        isRefAllowed = true;
        result = encodeTypedArray(val, options);
        break;
      }
      if (val instanceof Date) {
        isRefAllowed = Math.abs(val.getTime()) > 255;
        result = encodeDate(val, options);
        break;
      }
      if (isPrimitiveObjectWrapper(val)) {
        isRefAllowed = true;
        result = encodePrimitiveObjectWrapper(val, options);
        break;
      }
      if (isClassInstance(val)) {
        isRefAllowed = true;
        result = encodeClassInstance(val, options);
        break;
      }
      break;
    }
    case "bigint": {
      isRefAllowed = true;
      result = encodeBigInt(val);
      break;
    }
    case "symbol": {
      isRefAllowed = true;
      result = encodeSymbol(val);
      break;
    }
  }
  if (result === null) {
    throw new Error(`Unsupported encoding value: "${val}", type: "${type}"`);
  }
  if (refData) {
    if (isRefAllowed) {
      const refCopy = context.refCopy.get(result);
      if (refCopy) {
        if (!refData.encodedRefCopy) {
          refData.encodedRefCopy = encodeRef("copy", refCopy.refId, options);
        }
        return refData.encodedRefCopy;
      } else {
        context.refCopy.set(result, refData);
      }
    } else {
      context.refMap.delete(val);
    }
  }
  return result;
};

// src/encoder/options/createEncodeOptions.ts
var createEncodeOptions = () => {
  return {
    refs: {
      enabled: false
    },
    context: {
      refMap: /* @__PURE__ */ new Map(),
      refCopy: /* @__PURE__ */ new Map()
    },
    primitives: {
      objectWrappersAsPrimitiveValue: false
    },
    objects: {
      classInstanceConstructorNameKey: "__jsbtConstructorName"
    }
  };
};

// src/JSBT.ts
var JSBT = class {
  static setClassFactories(factories) {
    this._classFactories = factories;
  }
  static encode(value) {
    const options = createEncodeOptions();
    options.refs = {
      enabled: true
    };
    const result = encode(value, options);
    return result;
  }
  static decode(value) {
    const stream = new ByteStream(value);
    stream.completeStream();
    const options = createDecodeOptions();
    options.objects.factories = this._classFactories;
    options.context.readBytes = stream.getReadBytes();
    const result = decode(null, stream, options);
    return result;
  }
  static async decodeStream(stream) {
    const options = createDecodeOptions();
    options.objects.factories = this._classFactories;
    options.context.readBytes = stream.getReadBytes();
    const result = decodeStream(null, stream, options);
    return result;
  }
};
JSBT._classFactories = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ByteStream,
  JSBT
});
