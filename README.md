# Material Design plugin for [Desech Studio](https://www.desech.com/)

[www.desech.com](https://www.desech.com/)

## Install

- In Desech Studio
  - Go to Settings > Plugins > Material Design and install it.
  - Go to File > Project Settings > Design System Plugin > set to "Material Design".
- That's it. Ignore the rest if you don't plan on doing development on this plugin.

## Desech Studio integration

- Material design uses Roboto, so make sure you install the Roboto font in your Desech Studio pr0ject
- When working with react you need to use variables in this format `{text}`
- Have a look at the [Material design components](https://material.io/components?platform=web) to understand how to build them
- We also export the material design js file to allow for certain interactions to behave correctly

## Development

If you plan on helping out with code or extend this plugin, do the following:

```sh
git clone git@github.com:desech/material-design-project.git
npm install --force
npm run build
```

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

Go to [material.io](https://material.io/components?platform=web) to read the documentation.

## Desech Studio website

 - [www.desech.com](https://www.desech.com/)
