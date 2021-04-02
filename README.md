# Material Design plugin for Desech Studio

## Install

- In Desech Studio
  - Go to Settings > Plugins > Material Design and install it.
  - Go to File > Project Settings > Design System Plugin > set to "Material Design".
- That's it. Ignore the rest if you don't plan on doing development on this plugin.

## Desech Studio integration

- To have access to the material design css component classes, go to the Selectors section of an element and add a new Selector with a component class `mdc-button` or any other mdc css class.
  - MDC stands for Material Design Component

- A simple button can look like this:

```html
<button class="block e0mdbt01 mdc-button">
  <p class="text e0mdbt02 mdc-button__label">Login</p>
</button>
```

- An icon button with variables inside:

```html
<button class="block e0mdbi01 mdc-button mdc-button--raised">
  <svg class="e0mdbi02 mdc-button__icon" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none">
    </path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path>
  </svg>
  <p class="text e0mdbi03 mdc-button__label">{{text}}</p>
</button>
```

- When working with react you need to use variables in this format `{text}`
- Have a look at the [Material design components](https://material.io/components?platform=web) to understand how to build them
- We also export the material design js file to allow for certain interactions to behave correctly

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

Go to [material.io](https://material.io/components?platform=web) to read the documentation.
