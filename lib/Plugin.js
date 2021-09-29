const fs = require('fs')
const File = require('./File.js')

module.exports = {
  saveCssFile (folder) {
    const source = File.resolve(__dirname, '../dist/material-components-web.min.css')
    const dest = File.resolve(folder, 'css/general/design-system.css')
    fs.copyFileSync(source, dest)
  },

  saveJsFile (folder) {
    const source = File.resolve(__dirname, '../dist/material-components-web.min.js')
    const dest = File.resolve(folder, 'js/design-system.js')
    fs.copyFileSync(source, dest)
  }
}
