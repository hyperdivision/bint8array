const b = require('./')

const buf = new Uint8Array([ 0x4d, 0x61 ])
const buf1 = new Uint8Array([ 0x4d ])
const buf2 = new Uint8Array([ 0x4d, 0x61, 0x6e ])
const buf3 = new Uint8Array([ 0x4d, 0x61, 0x6e, 0x12, 0x5e, 0xa3, 0x49, 0x22, 0x01, 0xfe ])

console.log(b.toString(buf, 'base64'))
console.log(Buffer.from(buf).toString('base64'))

console.log(b.toString(buf1, 'base64'))
console.log(Buffer.from(buf1).toString('base64'))

console.log(b.toString(buf2, 'base64'))
console.log(Buffer.from(buf2).toString('base64'))

console.log(b.toString(buf3, 'base64'))
console.log(Buffer.from(buf3).toString('base64'))

console.log(b.fromString('fef56bd', 'hex'))
console.log(new Uint8Array(Buffer.from('fef56bd', 'hex')))

console.log(b.fromString('TWFu', 'base64'))
console.log(new Uint8Array(Buffer.from('TWFu', 'base64')))

console.log(b.fromString('TWFuEl6jSSIB/g==', 'base64'))
console.log(new Uint8Array(Buffer.from('TWFuEl6jSSIB/g==', 'base64')))
