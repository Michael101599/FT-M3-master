const express = require('express');
const app = express();
const {sumArray, pluck} = require('./utils.js')

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/product', (req, res) => {
  const {a, b} = req.body;

  if(!a || !b) return res.sendStatus(400);
  if(typeof a !== 'number' || typeof b !== 'number') return res.sendStatus(400);

  res.send({
    result: a * b,
  });
});

app.post('/sum', (req, res) => {
  const {a, b} = req.body
  res.send({
    result: a + b
  });
});

app.post('/sumArray', (req, res) => {
  const {array, num} = req.body;
  if(!array || !num && num !== 0) res.sendStatus(400);
  res.json({
    result: sumArray(array, num)
  });
});

app.get('/numString', (req, res) => {
  const {str} = req.query;
  if(typeof str !== 'string' || str === '') res.sendStatus(400);
  return res.json({
    result: str.length
  })
});

app.post('/pluck', (req, res) => {
  const {array, prop} = req.body;
  if(!Array.isArray(array) || !prop) res.sendStatus(404);
  return res.json({
    result: pluck(array, prop)
  })
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
