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
    let css = fs.readFileSync(file).toString()
    css = css.replace('/*# sourceMappingURL=material-components-web.min.css.map*/', '')
    css = css.replace(/\.(mdc-[a-z0-9-_]+)/g, (match, cls) => '.' + this.sanitizeClass(cls))
    css = this.revertCssReset(css)
    return css
  },

  sanitizeClass (cls) {
    // only allow alphanumeric and dashes
    return cls.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
  },

  revertCssReset (css) {
    // desech resets this css properties, so we need to set them back to the original value
    const classes = this.getAllClassSelectors(css)
    return classes.join(', ') + ` {
      margin: initial;
      padding: initial;
      line-height: initial;
      min-height: initial;
    }\n` + css
  },

  getAllClassSelectors (css) {
    const selectors = []
    for (const match of css.matchAll(/\.mdc-[a-z0-9-]+/g)) {
      if (!selectors.includes(match[0])) {
        selectors.push(match[0])
      }
    }
    return selectors
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
