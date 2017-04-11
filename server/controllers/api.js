const api = require('express').Router();
const Survey = require('../models/survey.js');

api.route('/surveys')
  .get((request, response, next) => {
    Survey.find({}).exec()
      .then((data) => { response.status(200).json(data); })
      .catch(next);
  })
  .post((request, response, next) => {
    Survey.create(request.body)
    .then((data) => { response.status(201).json(data); })
    .catch(next);
  });

api.route('/surveys/:id')
  .get((request, response, next) => {
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
  })
  .put((request, response, next) => {
    Survey.update({ _id: request.params.id }, request.body).exec()
    .then((result) => { response.status(200).json(result); })
    .catch(next);
  })
  .delete((request, response, next) => {
    Survey.findByIdAndRemove(request.params.id).exec()
    .then((result) => {
      if (result) {
        response.status(200).json(result);
      } else {
        throw Error({ status: 404 });
      }
    })
    .catch(next);
  });

// Handle unknown API requests
api.use((error, request, response, next) => {
  if (!error || error.value === 'nonexistantresource') {
    response.status(404).json({ message: 'Not found' });
  } else {
    next(error);
  }
});

module.exports = api;
