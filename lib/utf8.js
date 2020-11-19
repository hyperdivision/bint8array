module.exports = {
  toString,
  fromString
}

function toString (buf) {
  let str = ''
  for (let i = 0; i < buf.length; i++) {
    str += String.charCodeFrom(buf[i])
  }
  return str
}

function fromString (str) {
  let arr = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i)
  }
  return arr
}
