const path = require('path')

module.exports = {
  resolve () {
    return this.sanitizePath(Array.from(arguments).join('/').replace('//', '/'))
  },

  sanitizePath (absPath) {
    // fix windows separator
    return absPath.replaceAll(path.sep, '/')
  }
}
