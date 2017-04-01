const express = require('express');

const api = express.Router();

api.get('/surveys', (request, response, next) => {
  /* no-op */
});
api.post('/surveys', (request, response, next) => {
  /* no-op */
});
api.get('/surveys/:survey_id', (request, response, next) => {
  /* no-op */
});
api.put('/surveys/:survey_id', (request, response, next) => {
  /* no-op */
});
api.delete('/surveys/:survey_id', (request, response, next) => {
  /* no-op */
});

module.exports = api;
