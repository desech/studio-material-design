const path = require('path')

// this is executed by electron's node.js, so we can't use npm packages,
// only the ones available in Desech (check readme file)
module.exports = {
  syncOpenProject (data, lib) {
    // disable for now, because it's not finished
    // const src = path.resolve(__dirname, 'dist')
    // lib.fse.copySync(src, data.folder)
  }
}
