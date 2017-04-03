const express = require('express');

const api = express.Router();

api.get('/surveys', (request, response, next) => {
  response.status(404).send('Not found');
});
api.post('/surveys', (request, response, next) => {
  /* no-op */
});
api.get('/surveys/:id', (request, response, next) => {
  response.status(404).send('Not found');
});
api.put('/surveys/:id', (request, response, next) => {
  /* no-op */
});
api.delete('/surveys/:id', (request, response, next) => {
  /* no-op */
});

module.exports = api;
