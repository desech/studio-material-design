const fs = require('fs')
const File = require('./File.js')

module.exports = {
  _fromDir: './node_modules/material-components-web/dist/',
  _toDir: './dist',
  _cssFile: 'material-components-web.min.css',

  buildCssFiles () {
    const css = this.getCleanCss()
    this.saveCssFiles(css)
  },

  getCleanCss () {
    const file = File.resolve(this._fromDir, this._cssFile)
    return fs.readFileSync(file).toString()
      .replace('/*# sourceMappingURL=material-components-web.min.css.map*/', '')
      .replace(/\.(mdc-[a-z0-9-_]+)/g, (match, cls) => {
        return '.' + this.sanitizeClass(cls)
      })
  },

  sanitizeClass (cls) {
    // only allow alphanumeric and dashes
    return cls.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
  },

  saveCssFiles (css) {
    fs.writeFileSync(File.resolve(this._toDir, this._cssFile), css)
    const editorFile = this._cssFile.replace('web.min.css', 'web-editor.min.css')
    fs.writeFileSync(File.resolve(this._toDir, editorFile), css.replaceAll('.mdc-', '._ss_mdc-'))
  },

  copyBuildFile (file) {
    const from = File.resolve(this._fromDir, file)
    const to = File.resolve(this._toDir, file)
    fs.copyFileSync(from, to)
  }
}
