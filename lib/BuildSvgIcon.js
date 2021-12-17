const fs = require('fs')
const File = require('./File.js')
const Crypto = require('./Crypto.js')

// we use font icons instead because svg icons are not good enough when dealing with variants
// git clone git@github.com:google/material-design-icons.git in the root folder
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
    const component = this.buildComponent(file, icons)
    fs.writeFileSync(file, component)
  },

  getSvgIcons (folder) {
    const list = {}
    const folderVariants = this.getFolderVariants()
    const variants = this.getVariants()
    for (let i = 0; i < folderVariants.length; i++) {
      const file = File.resolve(folder, `materialicons${folderVariants[i]}/24px.svg`)
      if (fs.existsSync(file)) {
        list[variants[i]] = this.getSvgInner(file)
      }
    }
    return this.removeDuplicates(list)
  },

  getFolderVariants () {
    return ['', 'outlined', 'round', 'sharp', 'twotone']
  },

  getVariants () {
    return ['default', 'outlined', 'round', 'sharp', 'two-tone']
  },

  getSvgInner (file) {
    return File.readFile(file).replace(/<svg.*?>/g, '')
      .replace(/<\/svg>|<g>|<\/g>/g, '').trim()
  },

  removeDuplicates (list) {
    const variants = this.getVariants()
    for (let i = variants.length - 1; i >= 0; i--) {
      for (let j = 0; j < variants.length; j++) {
        if (i !== j && list[variants[i]] === list[variants[j]]) {
          delete list[variants[i]]
          variants.splice(i, 1)
          break
        }
      }
    }
    return list
  },

  buildComponent (file, icons) {
    const ref = this.getComponentRef(file)
    let html = '<svg class="_REF_" viewBox="0 0 24 24" data-ss-component="_VARIANTS_">' +
      '_INNER_</svg>'.replace('_REF_', ref)
    html = this.setDefaultSvgInner(html, icons)
    html = this.setVariantsInJson(html, ref, icons)
    return html
  },

  getComponentRef (file) {
    // if the file already exists, then use that ref instead of generating a new one
    // on updates, we need to make sure the refs stay the same to have consistency
    if (fs.existsSync(file)) {
      const html = File.readFile(file)
      const match = /class="(.*?)"/g.exec(html)
      return match[1]
    } else {
      return 'e0' + Crypto.generateSmallID()
    }
  },

  setDefaultSvgInner (html, icons) {
    const svg = Object.values(icons)[0]
    delete icons[Object.keys(icons)[0]]
    return html.replace('_INNER_', svg)
  },

  setVariantsInJson (html, ref, icons) {
    const data = { variants: { type: {} } }
    for (const [variant, svg] of Object.entries(icons)) {
      data.variants.type[variant] = { [ref]: { inner: svg } }
    }
    const json = JSON.stringify(data).replaceAll('"', '&quot;')
    return html.replace('_VARIANTS_', json)
  }
}
