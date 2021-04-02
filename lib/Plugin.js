const fs = require('fs')
const path = require('path')

module.exports = {
  getCssContents () {
    const file = path.resolve(__dirname, '../dist/material-components-web.min.css')
    return fs.readFileSync(file).toString()
  },

  saveCssFile (folder) {
    const source = path.resolve(__dirname, '../dist/material-components-web.min.css')
    const dest = path.resolve(folder, 'css/general/design-system.css')
    fs.copyFileSync(source, dest)
  },

  saveJsFile (folder) {
    const source = path.resolve(__dirname, '../dist/material-components-web.min.js')
    const dest = path.resolve(folder, 'js/design-system.js')
    fs.copyFileSync(source, dest)
  }
}
