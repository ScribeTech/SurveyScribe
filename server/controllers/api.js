const express = require('express');
const Survey = require('../models/survey.js');

const api = express.Router();

api.get('/surveys', (request, response, next) => {
  Survey.find({})
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((err) => {
      throw err;
    });
});
api.post('/surveys', (request, response, next) => {
  Survey.create(request.body)
    .then((data) => {
      response.status(201).send(data);
    })
    .catch((err) => {
      throw err;
    });
});
api.get('/surveys/:id', (request, response, next) => {
  Survey.findById(request.params.id)
  .then((result) => { response.status(200).json(result); })
  .catch(next);
});
api.put('/surveys/:id', (request, response, next) => {
  console.log('>>>>>>>>> Body', request.body);
  Survey.update(request.params.id, request.body)
  .then((result) => { response.status(200).json(result); })
  .catch(next);
});
api.delete('/surveys/:id', (request, response, next) => {
  /* no-op */
});

module.exports = api;
