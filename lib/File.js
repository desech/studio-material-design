const fs = require('fs')
const path = require('path')
const https = require('https')

module.exports = {
  resolve () {
    return this.sanitizePath(Array.from(arguments).join('/').replace('//', '/'))
  },

  sanitizePath (absPath) {
    // fix windows separator
    return absPath.replaceAll(path.sep, '/')
  },

  createMissingDir (dir) {
    // create sub dirs too
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  },

  readFile (file) {
    return fs.readFileSync(file).toString()
  },

  downloadFile (url, dest) {
    const file = fs.createWriteStream(dest)
    https.get(url, response => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
      })
    }).on('error', error => {
      fs.unlink(dest)
      console.error(error)
    })
  }
}
