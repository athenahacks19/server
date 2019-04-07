/*
  Modules
*/
const express = require('express');
const morgan = require('morgan');

/*
  Express Setup
*/
const app = express();
app.use(morgan('dev'));

/*
  Simple 'DB'
*/
const users = {};

/*
  Routes
*/
app.get('/', (req, res) => res.send(users));

app.get('/user', (req, res) => {
  const { userId } = req.query;
  res.send(users[userId]);
});

app.post('/bpm', (req, res) => {
  const { userId, bpm } = req.query;

  if (!users[userId]) users[userId] = {};

  users[userId].bpm = bpm;

  res.sendStatus(200);
});

app.post('/location', (req, res) => {
  const { userId, lat, lon } = req.query;

  if (!users[userId]) users[userId] = {};

  users[userId].location = { lat, lon };

  res.sendStatus(200);
});

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
