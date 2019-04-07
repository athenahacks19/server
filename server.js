/*
  Modules
*/
const express = require('express');
const morgan = require('morgan');

/*
  Express Setup
*/
const app = express();
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

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

app.post('/alert', (req, res) => {
  const { userId } = req.query;

  if (!users[userId]) users[userId] = {};

  users[userId].alert = true;

  setTimeout(() => {
    users[userId].alert = false;
  }, 15000);

  res.sendStatus(200);
});

app.post('/schedule', (req, res) => {
  const { userId } = req.query;
  const schedule = req.body;

  if (!users[userId]) users[userId] = {};

  users[userId].schedule = schedule;

  res.sendStatus(200);
});

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
