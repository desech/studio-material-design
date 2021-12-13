const fs = require('fs')
const File = require('./File.js')

module.exports = {
  _fromDir: './node_modules/material-components-web/dist/',
  _toDir: './dist',
  _cssFile: 'material-components-web.min.css',
  _jsFile: 'material-components-web.min.js',

  buildCssFiles () {
    const css = this.getCleanCss()
    this.saveCssFiles(css)
  },

  getCleanCss () {
    const file = File.resolve(this._fromDir, this._cssFile)
    let css = fs.readFileSync(file).toString()
    css = css.replace('/*# sourceMappingURL=material-components-web.min.css.map*/', '')
    css = this.sanitizeClasses(css)
    css = this.revertCssReset(css)
    return css
  },

  sanitizeClasses (css) {
    return css.replace(/(mdc-[a-z0-9-_]+)/g, (match, cls) => {
      return cls.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
    })
  },

  revertCssReset (css) {
    // desech resets these css properties, so we need to set them back to the original value
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
    fs.writeFileSync(File.resolve(this._toDir, 'design-system.css'), css)
    const editorFile = File.resolve(this._toDir, 'design-system-editor.css')
    fs.writeFileSync(editorFile, css.replaceAll('.mdc-', '._ss_mdc-'))
  },

  buildJsFile () {
    const from = File.resolve(this._fromDir, this._jsFile)
    const to = File.resolve(this._toDir, 'design-system.js')
    fs.writeFileSync(to, this.sanitizeJs(from))
  },

  sanitizeJs (file) {
    const js = fs.readFileSync(file).toString()
    return this.sanitizeClasses(js) + '\n\n\n' + this.getInitJs()
  },

  getInitJs () {
    const file = File.resolve('./lib/template/init.js')
    return fs.readFileSync(file).toString()
  }
}
