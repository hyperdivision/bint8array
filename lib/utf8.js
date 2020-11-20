const { StringDecoder } = require('string_decoder')
const stringFromCharCode = String.fromCharCode

module.exports = {
  toString,
  fromString
}

function toString (buf) {
  const decoder = new StringDecoder('utf8')
  return decoder.end(buf)
}

function fromString (str) {
  const buf = new Uint8Array(encodingLength(str))
  let offset = 0
  for (let i = 0; i < str.length; i++) {
    encode(str.charCodeAt(i), buf, offset)
    offset += encode.bytes
  }

  return buf
}

function encode (char, buf, offset) {
  if (!offset) offset = 0

  const startIndex = offset
  if (char > 0x7f) {

    buf[offset++] = 0xc0 | (char >>> 6)
    buf[offset++] = 0x80 | (char & 0x3f)
  } else {
    buf[offset++] = char & 0x7f
  }

  encode.bytes = offset - startIndex
  return buf
}

function encodingLength (str) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0x7f) len += 2
    else len++
  }
  return len
}
