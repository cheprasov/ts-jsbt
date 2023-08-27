
const ab = new ArrayBuffer(20);

const uint8 = new Uint8Array(ab);

uint8[0] = 123;
uint8[3] = 123123;

console.log(uint8, ab);

const encoder = new TextEncoder();
const view = encoder.encode("I💖JS");
console.log(view);
view.forEach(i => {
    console.log(i, i.toString(2).padStart(8, '0'));
});

function strEncodeUTF16(str: string) {
    var buf = new ArrayBuffer(str.length*2);
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  }

console.log(strEncodeUTF16('I💖JS'), '💖'.charCodeAt(0), '💖'.charCodeAt(1));