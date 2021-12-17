const Build = require('./lib/Build.js')
const BuildSvgIcon = require('./lib/BuildSvgIcon.js')
// const BuildFontIcon = require('./lib/BuildFontIcon.js')

Build.buildCssFiles()
Build.buildJsFile()
BuildSvgIcon.buildIcons()
// BuildFontIcon.buildIcons() // async
