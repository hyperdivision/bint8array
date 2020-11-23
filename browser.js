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
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

module.exports.compare = function (a, b) {
  let i
  for (i = 0; i < a.byteLength; i++) {
    if (a[i] < b[i]) return -1
    if (a[i] > b[i]) return 1
    if (i === b.byteLength) return -1
  }

  if (i === b.byteLength) return 0
  return -1
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
