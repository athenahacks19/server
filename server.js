/*
  Modules
*/
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

/*
  Express Setup
*/
const app = express();
app.use(morgan('dev'));

/*
  Routes
*/
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.port, () => console.log(`Server running on port ${config.port}!`))
