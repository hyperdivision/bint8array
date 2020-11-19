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
    case undefined :
      return utf8.fromString(str)

    default :
      throw new Error(`${enc} is not a supported encoding.`)
  }
}
