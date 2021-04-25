const fs = require('fs')
const File = require('./File.js')

module.exports = {
  copyBuildFile (file) {
    const srcDir = './node_modules/material-components-web/dist'
    const destDir = './dist'
    fs.copyFileSync(File.resolve(srcDir, file), File.resolve(destDir, file))
  }
}
