const fs = require('fs-extra')

module.exports = {
  clearFiles () {
    fs.emptyDirSync('./dist')
  },

  copyComponents () {
    const src = './material-design-project/project/component'
    const dest = './dist/component/design-system'
    fs.copySync(src, dest)
  },

  buildCssFile () {
    const src = './material-design-project/project/css/general/component-html.css'
    const dest = './dist/css/general/design-system.css'
    fs.copySync(src, dest)
  }
}
