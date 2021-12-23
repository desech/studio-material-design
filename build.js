const Build = require('./lib/Build.js')

// this is run by us directly, so we can use what ever npm package we want
Build.clearFiles()
Build.copyComponents()
Build.buildCssFile()
