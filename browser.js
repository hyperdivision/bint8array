const { hex, utf8, base64 } = require('./lib')

module.exports.toString = function (buf, enc) {
  switch (enc) {
    case 'hex' :
      return hex.toString(buf)

    case 'base64' :
      return base64.toString(buf)

    case 'utf-8' :
    case undefined :
      return utf8.toString(buf)

    default :
      throw new Error(`${enc} is not a supported encoding.`)
  }
}

module.exports.fromString = function (str, enc) {
  switch (enc) {
    case 'hex' :
      return hex.fromString(str)

    case 'base64' :
      return base64.fromString(str)

    case 'utf-8' :
    case 'utf8' :
    case 'ascii' :
    case undefined :
      return utf8.fromString(str)

    default :
      throw new Error(`${enc} is not a supported encoding.`)
  }
}

module.exports.equals = function (a, b) {
  if (a.byteLength !== b.byteLength) return false

  const len = a.byteLength >>> 2
  const A = new Uint32Array(a.buffer, a.byteOffset, len)
  const B = new Uint32Array(b.buffer, b.byteOffset, len)

  for (let i = 0; i < A.length; i++) {
    if (A[i] !== B[i]) return false
  }

  for (let i = len << 2; i < a.byteLength; i++) {
    if (a[i] !== b[i]) return false
  }

  return true
}

module.exports.compare = function (a, b) {
  const min = Math.min(a.byteLength, b.byteLength)
  const len = min >>> 2

  const A = new Uint32Array(a.buffer, a.byteOffset, len)
  const B = new Uint32Array(b.buffer, b.byteOffset, len)

  for (let i = 0; i < len; i++) {
    if (A[i] < B[i]) return -1
    if (A[i] > B[i]) return 1
  }

  for (let i = len << 2; i < min; i++) {
    if (a[i] < b[i]) return -1
    if (a[i] > b[i]) return 1
  }

  return a.byteLength > b.byteLength ? 1 : a.byteLength < b.byteLength ? -1 : 0
}

module.exports.concat = function (bufs) {
  const len = bufs.reduce((len, buf) => len + buf.byteLength, 0)

  const ret = new Uint8Array(len)
  bufs.reduce((acc, buf) => {
    ret.set(buf, acc)
    return acc + buf.byteLength
  }, 0)

  return ret
}

module.exports.allocUnsafe = function (size) {
  return new Uint8Array(size)
}
