const fs = require('fs')
const path = require('path')

module.exports = {
  copyBuildFile (file) {
    const srcDir = './node_modules/material-components-web/dist'
    const destDir = './dist'
    fs.copyFileSync(path.resolve(srcDir, file), path.resolve(destDir, file))
  }
}
