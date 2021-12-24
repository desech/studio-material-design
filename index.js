// this is executed by electron's node.js, so we can't use npm packages,
// only the ones available in Desech (check readme file)
module.exports = {
  syncOpenProject (data, lib) {
    lib.fse.copySync('./dist', data.folder)
  }
}
