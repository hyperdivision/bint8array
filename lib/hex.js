module.exports = {
  toString,
  fromString
}

function toString (buf) {
  let str = ''
  for (let i = 0; i < buf.length; i++) {
    str += buf[i].toString(16).padStart(2, '0')
  }
  return str
}

function fromString (str) {
  const arr = new Uint8Array(Math.floor(str.length) / 2)

  for (let i = 0; i < str.length / 2; i++) {
    const num = Number('0x' + str.slice(2 * i, 2 * i + 2))
    if (num !== num) throw new Error('Invalid hex string: unrecognised character.')

    arr[i] = num
  }

  return arr
}
