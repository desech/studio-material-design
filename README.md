# Material Design plugin for Desech Studio

## Install

- In Desech Studio
  - Go to Settings > Plugins > Material Design and install it.
  - Go to File > Project Settings > Design System Plugin > set to "Material Design".
- That's it. Ignore the rest if you don't plan on doing development on this plugin.

## Desech Studio integration

- 

## Development

If you plan on helping out with code or extend this plugin, do the following:

```sh
npm install
npm run build
```

- Open the `dist/material-components-web.min.css` file and delete the line `/*# sourceMappingURL=material-components-web.min.css.map*/`

## Included npm packages

All Desech Studio plugins have access to the following npm libraries, because they come with the application:
- `lib.AdmZip` [adm-zip](https://www.npmjs.com/package/adm-zip)
- `lib.archiver` [archiver](https://www.npmjs.com/package/archiver)
- `lib.fse` [fs-extra](https://www.npmjs.com/package/fs-extra)
- `lib.jimp` [jimp](https://www.npmjs.com/package/jimp)
- `lib.beautify` [js-beautify](https://www.npmjs.com/package/js-beautify)
- `lib.jsdom` [jsdom](https://www.npmjs.com/package/jsdom)
- `lib.fetch` [node-fetch](https://www.npmjs.com/package/node-fetch)

## Other Documentation

Go to [material.io](https://material.io/develop/web/docs/getting-started) to read the documentation.
