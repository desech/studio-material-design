const fs = require('fs')
const File = require('./File.js')

module.exports = {
  _fromDir: './material-design-icons/src',
  _toDir: './lib/template/design-system/icon',

  buildIcons () {
    const folders = fs.readdirSync(this._fromDir, { withFileTypes: true })
    for (const entry of folders) {
      if (!entry.isDirectory()) continue
      this.createMainFolder(entry.name)
      this.createFolderComponents(entry.name)
    }
  },

  createMainFolder (name) {
    const folder = File.resolve(this._toDir, this.sanitizeName(name))
    File.createMissingDir(folder)
  },

  sanitizeName (name) {
    return name.replace(/[^a-z0-9-]/g, '-')
  },

  createFolderComponents (mainFolder) {
    const mainFolderPath = File.resolve(this._fromDir, mainFolder)
    const folders = fs.readdirSync(mainFolderPath, { withFileTypes: true })
    for (const folder of folders) {
      this.createComponent(mainFolder, folder.name)
    }
  },

  createComponent (mainFolder, subFolder) {
    const folder = File.resolve(this._fromDir, mainFolder, subFolder)
    const icons = this.getSvgIcons(folder)
    const file = File.resolve(this._toDir, mainFolder, this.sanitizeName(subFolder) + '.html')
    const component = this.buildComponent(icons)
    fs.writeFileSync(file, component)
  },

  getSvgIcons (folder) {
    const list = {}
    for (const variant of this.getVariants()) {
      const file = File.resolve(folder, `materialicons${variant.replace('default', '')}/24px.svg`)
      if (fs.existsSync(file)) list[variant] = File.readFile(file)
    }
    return list
  },

  getVariants () {
    return ['default', 'outlined', 'round', 'sharp', 'twotone']
  },

  buildComponent (icons) {
    return JSON.stringify(icons, null, 2)
  }
}
