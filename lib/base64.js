const B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

module.exports = {
  toString,
  fromString
}

function toString (buf) {
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

function fromString (str) {
  validate(str)

  const eq = str.indexOf('=')
  const end = eq < 0 ? str.length : eq
  const arr = new Uint8Array(end * 3 / 4)

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

function validate (str) {
  if (str.length % 4 !== 0) throw new Error('base64 contains bad characters')
  if (str.includes('=') && str.length - str.indexOf('=') > 3) throw new Error('poorly formed base64 string')
  if (str
    .split('')
    .filter(c => !B64_CHARS.includes(c))
    .filter(c => c !== '=')
    .length > 0) {
    throw new Error('base64 string has been incorrectly padded.')
  }
}
