module.exports = {
  isNumeric (string) {
    return !isNaN(parseFloat(string)) && isFinite(string)
  },

  unique (array) {
    return [...new Set(array)]
  }
}
