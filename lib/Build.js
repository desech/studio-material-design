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
    css = this.revertCssReset(css)
    return css
  },

  revertCssReset (css) {
    // desech resets these css properties, so we need to set them back to the original value
    const selectors = this.getCssClassSelectors(css)
    this.addMissingJsClassSelectors(selectors)
    return selectors.join(', ') + ` {
      margin: initial;
      padding: initial;
      line-height: initial;
      min-height: initial;
    }\n` + css
  },

  getCssClassSelectors (css) {
    const selectors = []
    for (const match of css.matchAll(/\.mdc-[a-z0-9-_]+/g)) {
      if (!selectors.includes(match[0])) {
        selectors.push(match[0])
      }
    }
    return selectors
  },

  // some classes like mdc-slider--range have no css, but we still need them for validation
  // in desech studio, so fetch them from the js file
  addMissingJsClassSelectors (selectors) {
    const file = File.resolve(this._fromDir, this._jsFile)
    const js = fs.readFileSync(file).toString()
    for (const match of js.matchAll(/"(mdc-[a-z0-9-_]+[a-z0-9])"/g)) {
      const selector = '.' + match[1]
      if (!selectors.includes(selector)) {
        selectors.push(selector)
      }
    }
  },

  saveCssFiles (css) {
    fs.writeFileSync(File.resolve(this._toDir, 'design-system.css'), css)
    const editorFile = File.resolve(this._toDir, 'design-system-editor.css')
    fs.writeFileSync(editorFile, css.replaceAll('.mdc-', '._ss_mdc-'))
  },

  buildJsFile () {
    const from = File.resolve(this._fromDir, this._jsFile)
    const to = File.resolve(this._toDir, 'design-system.js')
    const js = fs.readFileSync(from).toString() + '\n\n\n' + this.getInitJs()
    fs.writeFileSync(to, js)
  },

  getInitJs () {
    const file = File.resolve('./lib/template/init.js')
    return fs.readFileSync(file).toString()
  }
}
