module.exports = {
  sortObjectByKey (unordered) {
    return Object.keys(unordered).sort().reduce((obj, key) => {
      obj[key] = unordered[key]
      return obj
    }, {})
  }
}
