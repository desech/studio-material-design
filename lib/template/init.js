// auto initialize all material design components
// components need to have data-mdc-auto-init="MDCTextField", where MDCTextField is the class name
// https://material.io/develop/web/supporting/auto-init
document.addEventListener('DOMContentLoaded', () => {
  window.mdc.autoInit()

  // some components need to be manually instantiated
  // https://material.io/develop/web/getting-started
  const data = [
    { class: 'mdc-tab-bar', mainObj: 'tabBar', subObj: 'MDCTabBar' },
    { class: 'mdc-tab-scroller', mainObj: 'tabScroller', subObj: 'MDCTabScroller' },
    { class: 'mdc-tab', mainObj: 'tab', subObj: 'MDCTab' },
    { class: 'mdc-tab-indicator', mainObj: 'tabIndicator', subObj: 'MDCTabIndicator' }
  ]
  for (const record of data) {
    for (const node of document.getElementsByClassName(record.class)) {
      window.mdc[record.mainObj][record.subObj].attachTo(node)
    }
  }
})
