// auto initialize all material design components
// components need to have data-mdc-auto-init="MDCTextField", where MDCTextField is the class name
// https://material.io/develop/web/supporting/auto-init
document.addEventListener('DOMContentLoaded', () => {
  window.mdc.autoInit(document, () => {})

  // some components need to be manually instantiated
  // https://material.io/develop/web/getting-started
  const attachData = [
    { class: 'mdc-tab-bar', mainObj: 'tabBar', subObj: 'MDCTabBar' },
    { class: 'mdc-tab-scroller', mainObj: 'tabScroller', subObj: 'MDCTabScroller' },
    { class: 'mdc-tab', mainObj: 'tab', subObj: 'MDCTab' },
    { class: 'mdc-tab-indicator', mainObj: 'tabIndicator', subObj: 'MDCTabIndicator' }
  ]
  for (const record of attachData) {
    for (const node of document.querySelectorAll(`.${record.class}:not([hidden])`)) {
      window.mdc[record.mainObj][record.subObj].attachTo(node)
    }
  }

  // some components need to be specifically opened
  const openData = [
    { class: 'mdc-banner', mainObj: 'banner', subObj: 'MDCBanner' }
  ]
  for (const record of openData) {
    for (const node of document.querySelectorAll(`.${record.class}:not([hidden])`)) {
      const obj = new window.mdc[record.mainObj][record.subObj](node)
      obj.open()
    }
  }
})
