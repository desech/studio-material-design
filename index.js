const Plugin = require(__dirname + '/lib/Plugin.js')

// executed by electron's node.js
module.exports = {
  getEditorCss () {
    const css = Plugin.getCssContents()
    // all classes need to start with _ss_
    return css.replace(/\.mdc-/gi, '._ss_mdc-')
  },

  saveToFile (data) {
    Plugin.saveCssFile(data.folder)
    Plugin.saveJsFile(data.folder)
    Plugin.saveComponents(data.folder)
  }
}
