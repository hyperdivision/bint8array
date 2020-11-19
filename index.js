const B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

module.exports = function toString (buf, enc) {
  switch (enc) {
    case 'hex' :
      return toHexString(buf)

    case 'base64' :
      return toBase64String(buf)

    case 'utf-8' :
    case undefined :
      return toUtf8String(buf)

    default :
      throw new Error(`${enc} is not a supported encoding.`)
  }
}

module.exports.fromString = function (str, enc) {
  switch (enc) {
    case 'hex' :
      return fromHexString(str)

    case 'base64' :
      return fromBase64String(str)

    case 'utf-8' :
    case undefined :
      return fromUtf8String(str)

    default :
      throw new Error(`${enc} is not a supported encoding.`)
  }
}

function toHexString (buf) {
  let str = ''
  for (let i = 0; i < buf.length; i++) {
    str += buf[i].toString(16).padStart(2, '0')
  }
  return str
}

function fromHexString (str) {
  const arr = new Uint8Array(Math.floor(str.length) / 2)

  for (let i = 0; i < str.length / 2; i++) {
    arr[i] = Number('0x' + str.slice(2 * i, 2 * i + 2))
  }

  return arr
}

function toUtf8String (buf) {
  let str = ''
  for (let i = 0; i < buf.length; i++) {
    str += String.charCodeFrom(buf[i])
  }
  return str
}

function fromUtf8String (str) {
  let arr = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i)
  }
  return arr
}

function toBase64String (buf) {
  let str = ''
  let char = 0

  let i
  for (i = 0; i < buf.length; i++) {
    const offset = (8 * i) % 6 + 2
    char <<= 8 - offset

    const himask = (1 << offset % 6) - 1
    const lomask = 0xff ^ himask

    char |= (buf[i] & lomask) >> offset

    str += B64_CHARS[char]
    char = buf[i] & himask

    if (offset === 6) {
      str += B64_CHARS[buf[i] & 0x3f]
      char = 0
    }
  }

  if (i % 3 !== 0) {
    char <<= 6 - ((buf.length * 8) % 6)
    str += B64_CHARS[char] 
  }

  const pad = (3 - Math.floor((buf.length * 8) / 6) % 4) % 3
  return str.padEnd(str.length + pad, '=')
}

function fromBase64String (str) {
  const eq = str.indexOf('=')
  const end = eq < 0 ? str.length : eq
  let arr = new Uint8Array(end * 3 / 4)

  let index = 0
  for (let i = 0; i < str.length; i += 4) {
    const chars = str.slice(i, i + 4).split('').map(c => B64_CHARS.indexOf(c))

    let offset = 6
    let j = 0
    while (j < chars.length - 1 && index < arr.length) {
      arr[index] |= chars[j++] << (8 - offset) & 0xff
      arr[index++] |= chars[j] >>> (offset - 2) & 0xff
      offset = (offset + 6) % 8
    }
  }

  return arr
}
