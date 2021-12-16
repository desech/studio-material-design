const Build = require('./lib/Build.js')
const BuildFontIcon = require('./lib/BuildFontIcon.js')
// const BuildSvgIcon = require('./lib/BuildSvgIcon.js')

Build.buildCssFiles()
Build.buildJsFile()
BuildFontIcon.buildIcons()
// BuildSvgIcon.buildIcons()
