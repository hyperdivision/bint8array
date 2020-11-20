# bint8array

Emulate core Buffer methods for Uint8Arrays

## Usage

```sh
npm i -s bint8array
```

```js
const bint = require('bint8array')

const buf = bint.allocUnsafe(32)
const hex = bint.fromString('776f726b7320696e2062726f7773657220746f6f21', 'hex')
const b64 = bint.fromString('deadbeef11247', 'hex')
const text = bint.toString(hex, 'utf8')

console.log(text)
// works in browser too!

console.log(bint.compare(Buffer.alloc(2), Buffer.alloc(2, 1)))
// -1
```

## API

#### `bint.toString(buf, [enc])`

Decode bytes to a string according to the given encoding `enc`. Options for `enc` are `ascii`, `utf8`, `utf-8`, `hex` and `base64`.


#### `bint.fromString(string, [enc])`

Encode a string to binary according to the given encoding `enc`. Options for `enc` are `ascii`, `utf8`, `utf-8`, `hex` and `base64`.

Note that for `hex` encoding, if the string is not of even length, the last character shall be ignore. This is in keeping with the behaviour of the core `Buffer.from` method.


#### `bint.compare(buf1, buf2)`

Compare two Uint8Arrays bytewise. Returns `-1` if buf1 is lesser, `1` if buf2 is greater and `0` if and only if `buf1[i] ==== buf2[i]` for all `len = buf1.byteLength = buf2.byteLength`.

#### `bint.concat(arrrayOfBuffers)`

Concatenate an array of Uint8Arrays into a single Uint8Array.

#### `bint.allocUnsafe(size)`

Create a new Uint8Array of a given size.
