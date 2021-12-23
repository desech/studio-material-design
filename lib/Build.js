const fs = require('fs-extra')

module.exports = {
  copyComponents () {
    fs.emptyDirSync('./dist/component')
    fs.copySync('./material-design-project/project/component', './dist/component')
  },

  buildCssFile () {
    const src = './material-design-project/project/css/general/component-html.css'
    fs.copySync(src, './dist/design-system.css')
  }
}
