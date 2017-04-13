const controller = require('express').Router();
const Survey = require('../models/survey.js');

controller.route('/')
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

controller.route('/:id')
  .get((request, response, next) => {
    Survey.findById(request.params.id).exec()
    .then((result) => {
      if (result) {
        response.status(200).json(result);
      } else {
        next({ status: 404 });
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
        next({ status: 404 });
      }
    })
    .catch(next);
  });

module.exports = controller;
