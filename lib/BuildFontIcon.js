const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const File = require('./File.js')

module.exports = {
  async buildIcons () {
    const css = await this.getAllCss()
    await this.saveFonts(css)
    this.saveCssFile(css)
  },

  async getAllCss () {
    let css = ''
    for (const family of this.getFamilies()) {
      css += await this.fetchUrl('https://fonts.googleapis.com/css2?family=' + family) + '\n'
    }
    return css
  },

  getFamilies () {
    return [
      'Material+Icons',
      'Material+Icons+Outlined',
      'Material+Icons+Round',
      'Material+Icons+Sharp',
      'Material+Icons+Two+Tone'
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
  }
}
