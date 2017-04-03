const express = require('express');
const survey = require('../models/survey.js');

const api = express.Router();

api.get('/surveys', (request, response, next) => {
  survey.find({})
    .then((resp) => {
      response.send(resp);
      next();
    })
    .catch((err) => {
      throw err;
    });
});
api.post('/surveys', (request, response, next) => {
  console.log(request.body);
  // survey.insert(request.body)
  //   .then((resp) => {
  //     response.send(201);
  //     next();
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
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
