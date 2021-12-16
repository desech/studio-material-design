const nanoid = require('nanoid')

module.exports = {
  generateSmallID () {
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
    return nanoid.customAlphabet(alphabet, 6)()
  }
}
