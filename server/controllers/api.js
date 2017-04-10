const express = require('express');
const Survey = require('../models/survey.js');

const api = express.Router();

api.get('/surveys', (request, response, next) => {
  Survey.find({}).exec()
    .then((data) => { response.status(200).json(data); })
    .catch(next);
});
api.post('/surveys', (request, response, next) => {
  Survey.create(request.body)
    .then((data) => { response.status(201).json(data); })
    .catch(next);
});
api.get('/surveys/:id', (request, response, next) => {
  Survey.findById(request.params.id).exec()
  .then((result) => {
    if (result) {
      response.status(200).json(result);
    } else {
      // TODO: send this to the generic error handler instead of responding here
      response.sendStatus(404);
    }
  })
  .catch(next);
});
api.put('/surveys/:id', (request, response, next) => {
  Survey.update({ _id: request.params.id }, request.body).exec()
  .then((result) => { response.status(200).json(result); })
  .catch(next);
});
api.delete('/surveys/:id', (request, response, next) => {
  Survey.findByIdAndRemove(request.params.id).exec()
  .then((result) => {
    if (result) {
      response.status(200).json(result);
    } else {
      // TODO: send this to the generic error handler instead of responding here
      response.sendStatus(404);
    }
  })
  .catch(next);
});

module.exports = api;
