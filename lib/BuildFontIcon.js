const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const File = require('./File.js')
const ExtendJS = require('./ExtendJS.js')

module.exports = {
  async buildIcons () {
    const css = await this.getAllCss()
    await this.saveFonts(css)
    this.saveCssFile(css)
    this.createIconComponent()
  },

  async getAllCss () {
    let css = ''
    for (const type of this.getIconTypes()) {
      const url = 'https://fonts.googleapis.com/css2?family=' + type.replaceAll(' ', '+')
      css += await this.fetchUrl(url) + '\n'
    }
    return css
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
    File.createMissingDir('./dist/font')
    for (const match of css.matchAll(/url\((.*?)\)/g)) {
      await this.saveFont(match[1])
    }
  },

  async saveFont (url) {
    const file = './dist/font/' + path.basename(url)
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

  createIconComponent () {
    const data = this.getVariantData()
    const json = JSON.stringify(data).replaceAll('"', '&quot;')
    const html = `<p class="text e0w7lmaa mdc-icon" data-ss-component="${json}">stars</p>`
    fs.writeFileSync('./dist/components/icon.html', html)
  },

  getVariantData () {
    const data = this.getStartingData()
    for (const code of this.getCodes()) {
      data.variants.icon[code] = { e0w7lmaa: { inner: code } }
    }
    return data
  },

  getStartingData () {
    return {
      variants: {
        type: {
          outlined: { e0w7lmaa: { classes: { 'mdc-icon-outlined': { add: true } } } },
          round: { e0w7lmaa: { classes: { 'mdc-icon-round': { add: true } } } },
          sharp: { e0w7lmaa: { classes: { 'mdc-icon-sharp': { add: true } } } },
          'two-tone': { e0w7lmaa: { classes: { 'mdc-icon-two-tone': { add: true } } } }
        },
        icon: {}
      }
    }
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

  addCodes (string, codes) {
    for (const line of string.split('\n')) {
      if (!line.trim()) continue
      const value = line.trim().substring(0, line.indexOf(' '))
      codes.push(value)
    }
  }
}
