const Translate = require('google-translate-api');

const translate = (text, to, from = 'en') => {
  return Translate(text, { from, to })
    .then(response => response.text)
}

module.exports = {
  translate
}
