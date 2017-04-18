const Survey = require('../models/survey.js');
const Response = require('../models/response.js');

// Only allow owners to access a survey
const isOwner = (doc, request) => {
  if (doc && doc.owners.includes(request.session.user)) {
    return Promise.resolve(doc);
  }
  return Promise.reject(401);
};

exports.list = (request, response, next) => {
  const _id = request.session.user;
  Survey.find({ owners: { $in: [_id] } }, '_id title').exec()
  .then(docs => response.status(200).json(docs))
  .catch(next);
};

exports.create = (request, response, next) => {
  // the current user is the default owner
  const owners = request.body.owners || [request.session.user];
  const survey = Object.assign({}, request.body, { owners });
  Survey.create(survey)
  .then(doc => response.status(201).json(doc))
  .catch(next);
};

exports.read = (request, response, next) => {
  Survey.findById(request.params.survey).exec()
  .then(doc => isOwner(doc, request))
  .then(doc => response.status(200).json(doc))
  .catch(next);
};

exports.update = (request, response, next) => {
  Survey.findById(request.params.survey).exec()
  .then(data => isOwner(data, request))
  .then((data) => {
    const doc = data;
    doc.title = request.body.title;
    doc.owners = request.body.owners;
    doc.questions = request.body.questions;
    return doc.save();
  })
  .then((result) => { response.status(200).json(result); })
  .catch(next);
};

exports.delete = (request, response, next) => {
  Survey.findById(request.params.survey).exec()
  .then(doc => isOwner(doc, request))
  .then(doc => doc.remove())
  .then(doc => response.status(200).json(doc))
  .catch(next);
};

exports.response = {};

exports.response.list = (request, response, next) => {
  const survey = request.params.survey;
  Survey.findById(survey).exec()
  .then(doc => isOwner(doc, request))
  .then(() => Response.find({ survey }).exec())
  .then(doc => response.status(200).json(doc))
  .catch(next);
};

exports.response.read = (request, response, next) => {
  const survey = request.params.survey;
  const _id = request.params.response;
  Survey.findById(survey).exec()
  .then(doc => isOwner(doc, request))
  .then(() => Response.find({ _id, survey }).exec())
  .then(doc => response.status(200).json(doc))
  .catch(next);
};
