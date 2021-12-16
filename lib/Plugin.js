const fs = require('fs')
const File = require('./File.js')

module.exports = {
  saveCssFile (folder) {
    const source = File.resolve(__dirname, '../dist/design-system.css')
    const dest = File.resolve(folder, 'css/general/design-system.css')
    fs.copyFileSync(source, dest)
  },

  async saveIconFontFiles (folder) {
    const source = File.resolve(__dirname, '../dist/design-system')
    const dest = File.resolve(folder, 'css/general/design-system')
    File.createMissingDir(dest)
    const fileTree = File.readFolder(source)
    await File.syncFolder(fileTree, source, dest)
  },

  saveJsFile (folder) {
    const source = File.resolve(__dirname, '../dist/design-system.js')
    const dest = File.resolve(folder, 'js/design-system.js')
    fs.copyFileSync(source, dest)
  }
}
