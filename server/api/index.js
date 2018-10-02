const { Router } = require('express');
const { translate } = require('../helpers');

const api = Router();

api.post('/translate', ({ body: { data, input_column, output_column } }, res) => {
  const promises = data.map(row => row[input_column - 1] ? translate(row[input_column - 1], 'kn') : Promise.resolve());
  Promise.all(promises)
    .then(translatedData => {
      return res.json(data.map((row, i) => {
        row[output_column - 1] = row[output_column - 1] || (translatedData ? translatedData[i] : '');
        return row;
      }));
    })
    .catch(error => {
      console.error(error);
      res.status(400).json(error);
    })
});

module.exports = api;
