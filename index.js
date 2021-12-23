const Plugin = require('./lib/Plugin.js')

// this is executed by electron's node.js, so we can't use npm packages,
// only the ones available in Desech (check readme file)
module.exports = {
  enablePlugin (lib) {
    this.uninstallPlugin(lib)
    // sync files
  },

  updatePlugin (lib) {
    this.installPlugin(lib)
  },

  uninstallPlugin (lib) {
    // remove files
  }
}
