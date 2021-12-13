// auto initialize all material design components
// components need to have data-mdc-auto-init="MDCTextField", where MDCTextField is the class name
// https://material.io/develop/web/supporting/auto-init
document.addEventListener('DOMContentLoaded', () => {
  window.mdc.autoInit()
})
