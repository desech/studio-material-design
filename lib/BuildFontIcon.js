const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const File = require('./File.js')
const ExtendJS = require('./ExtendJS.js')

module.exports = {
  _ref: 'e0w7lmaa',

  async buildIcons () {
    const css = await this.getAllCss()
    await this.saveFonts(css)
    this.saveCssFile(css)
    const codes = this.getCodes()
    this.createIconComponent(codes)
    this.buildIconPreview(codes)
  },

  async getAllCss () {
    return await this.fetchUrl('https://fonts.googleapis.com/css?family=Material+Icons|' +
      'Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp')
  },

  async fetchUrl (url) {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
          'Chrome/96.0.4664.93 Safari/537.36'
      }
    }
    const response = await fetch(url, options)
    if (!response.ok) throw new Error(`Can't access url ${url}`)
    return await response.text()
  },

  async saveFonts (css) {
    File.createMissingDir('./dist/design-system')
    for (const match of css.matchAll(/url\((.*?)\)/g)) {
      await this.saveFont(match[1])
    }
  },

  async saveFont (url) {
    const file = './dist/design-system/' + path.basename(url)
    File.downloadFile(url, file)
  },

  saveCssFile (string) {
    const css = string.replace(/url\((.*?)\)/g, (match, url) => {
      return `url(./design-system/${path.basename(url)})`
    })
    fs.appendFileSync('./dist/design-system.css',
      '\n' + css.replaceAll('.material-icons', '.mdc-icon'))
    fs.appendFileSync('./dist/design-system-editor.css',
      '\n' + css.replaceAll('.material-icons', '._ss_mdc-icon'))
  },

  getCodes () {
    const codes = []
    const base = './material-design-icons/font'
    for (const type of this.getIconTypes()) {
      const file = type.replaceAll(' ', '') + '-Regular.codepoints'
      const string = File.readFile(File.resolve(base, file))
      this.addCodes(string, codes)
    }
    return ExtendJS.unique(codes).sort()
  },

  getIconTypes () {
    return [
      'Material Icons',
      'Material Icons Outlined',
      'Material Icons Round',
      'Material Icons Sharp',
      'Material Icons Two Tone'
    ]
  },

  addCodes (string, codes) {
    for (const line of string.split('\n')) {
      if (!line.trim()) continue
      const value = line.trim().substring(0, line.indexOf(' '))
      codes.push(value)
    }
  },

  createIconComponent (codes) {
    const data = this.getVariantData(codes)
    const json = JSON.stringify(data).replaceAll('"', '&quot;')
    const html = `<p class="text ${this._ref} mdc-icon" data-ss-component="${json}">stars</p>`
    fs.writeFileSync('./dist/components/icon.html', html)
  },

  getVariantData (codes) {
    const data = this.getStartingData()
    for (const code of codes) {
      data.variants.icon[code] = { [this._ref]: { inner: code } }
    }
    return data
  },

  getStartingData () {
    return {
      variants: {
        type: {
          outlined: { [this._ref]: { classes: { 'mdc-icon-outlined': { add: true } } } },
          round: { [this._ref]: { classes: { 'mdc-icon-round': { add: true } } } },
          sharp: { [this._ref]: { classes: { 'mdc-icon-sharp': { add: true } } } },
          'two-tone': { [this._ref]: { classes: { 'mdc-icon-two-tone': { add: true } } } }
        },
        icon: {}
      }
    }
  },

  buildIconPreview (codes) {
    const html = File.readFile('./lib/template/preview.html')
    const cells = this.getPreviewCells(codes)
    fs.writeFileSync('./dist/design-system/preview.html', html.replace('_BODY_', cells))
  },

  getPreviewCells (codes) {
    let cells = ''
    for (const code of codes) {
      cells += `<div class="cell"><p class="mdc-icon">${code}</p><p>${code}</p></div>\n`
    }
    return cells
  }
}
