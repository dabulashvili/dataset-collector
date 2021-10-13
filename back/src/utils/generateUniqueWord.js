const crypto = require('crypto')

module.exports = (chars = 16, encoding = 'hex') =>
    crypto.randomBytes(chars).toString(encoding)
