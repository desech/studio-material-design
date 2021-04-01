const fs = require('fs')
const path = require('path')
const File = require('./File.js')

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
  },

  async saveComponents (folder) {
    const source = path.resolve(__dirname, 'component/design-system')
    const dest = path.resolve(folder, 'component/design-system')
    await this.syncFiles(source, dest)
  },

  async syncFiles (source, dest) {
    File.createMissingDir(dest)
    const fileTree = File.readFolder(source)
    // we want to overwrite all the components to stay up to date
    await File.syncFolder(fileTree, source, dest)
  }
}
