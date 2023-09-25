import { JSBT } from './JSBT';

const data = {};

console.time('JSBT');
const jsbt = JSBT.encode(data);
console.timeEnd('JSBT');
console.log(jsbt.length, jsbt);

console.time('JSON');
const json = JSON.stringify(data);
console.timeEnd('JSON');
console.log(json.length);

console.time('JSBT');
const res1 = JSBT.decode(jsbt);
console.timeEnd('JSBT');

console.log(JSON.stringify(res1, null, 2));
console.log(JSON.stringify(res1) === json);

console.time('JSON');
const res2 = JSON.parse(json);
console.timeEnd('JSON');