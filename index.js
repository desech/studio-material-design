const File = require('./lib/File.js')
const Plugin = require('./lib/Plugin.js')

// executed by electron's node.js
module.exports = {
  async getEditorCssFile () {
    return File.resolve(__dirname, 'dist/design-system-editor.css')
  },

  async saveToFile (data, lib) {
    Plugin.saveCssFile(data.folder)
    await Plugin.saveIconFontFiles(data.folder)
    Plugin.saveJsFile(data.folder)
  }
}
