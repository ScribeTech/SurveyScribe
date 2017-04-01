const express = require('express');

const api = express.Router();

api.get('/survey', (request, response, next) => {
  /* no-op */
});
api.post('/survey', (request, response, next) => {
  /* no-op */
});
api.put('/survey/:id', (request, response, next) => {
  /* no-op */
});
api.delete('/survey/:id', (request, response, next) => {
  /* no-op */
});

module.exports = api;
