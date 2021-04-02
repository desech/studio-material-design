const Plugin = require('./lib/Plugin.js')

// executed by electron's node.js
module.exports = {
  async getEditorCss () {
    const css = Plugin.getCssContents()
    // all classes need to start with _ss_
    return css.replace(/\.mdc-/gi, '._ss_mdc-')
  },

  async saveToFile (data, lib) {
    Plugin.saveCssFile(data.folder)
    Plugin.saveJsFile(data.folder)
  }
}
