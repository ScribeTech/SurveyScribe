const assert = require('assert');
const User = require('../models/user.js');

// Only allow owners to access a survey
const isUser = (doc, request) => {
  if (doc && doc._id === request.session.user) {
    return Promise.resolve(doc);
  }
  return Promise.reject(401);
};

exports.list = (request, response, next) => {
  User.find({ }).exec()
    .then((data) => { response.status(200).json(data); })
    .catch(next);
};

exports.create = (request, response, next) => {
  const name = request.body.name;
  User.find({ name }).exec()
  // make sure this username isn't taken
  .then(docs => assert.ok(docs.length < 1, 'This name is already taken'))
  .then(() => User.create(request.body))
  .then(doc => response.status(201).json(doc))
  .catch(next);
};

exports.read = (request, response, next) => {
  User.findById(request.params.user).exec()
  .then(doc => isUser(doc, request))
  .then(doc => response.status(200).json(doc))
  .catch(next);
};

exports.update = (request, response, next) => {
  const _id = request.session.user;
  Response.update({ _id }, request.body).exec()
  .then(doc => isUser(doc, request))
  .then(doc => response.status(200).json(doc))
  .catch(next);
};

exports.delete = (request, response, next) => {
  User.findByIdAndRemove(request.session.user).exec()
  .then(doc => isUser(doc, request))
  .then(doc => response.status(200).json(doc))
  .catch(next);
};
