const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./api')

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3600;

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan(isDev ? 'dev' : 'combined'));


app.use('/api', api);

app.use(express.static(path.join(__dirname, '../', 'build')));

app.listen(PORT, () => { console.info(`App started on PORT: ${PORT}`) });

module.exports = app;
