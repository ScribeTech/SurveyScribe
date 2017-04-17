const Promise = require('bluebird');
const Response = require('../models/response.js');

// Only the session that created a response may access it directly
const isParticipant = (doc, request) => {
  if (doc && doc.participant === request.sessionID) {
    return Promise.resolve(doc);
  }
  return Promise.reject(401);
};

exports.list = (request, response, next) => {
  const participant = request.sessionID;
  Response.find({ participant }).exec()
  .then((data) => { response.status(200).json(data); })
  .catch(next);
};

exports.create = (request, response, next) => {
  // Add the current session as the participant before creating the survey
  const res = Object.assign({}, request.body, { participant: request.sessionID });
  Response.create(res)
  .then((data) => { response.status(201).json(data); })
  .catch(next);
};

exports.read = (request, response, next) => {
  // 'participant' is not selected by default, so we must select it for
  // `isParticipant` to work.
  Response.findById(request.params.response, '_id participant survey answers').exec()
  .then(data => isParticipant(data, request))
  .then((data) => { response.status(200).json(data); })
  .catch(next);
};

exports.update = (request, response, next) => {
  Response.findById(request.params.response, '_id participant survey answers').exec()
  .then(data => isParticipant(data, request))
  .then((data) => {
    const doc = data;
    doc.answers = request.body.answers;
    return doc.save();
  })
  .then((result) => { response.status(200).json(result); })
  .catch(next);
};

exports.delete = (request, response, next) => {
  // 'participant' is not selected by default, so we must select it for
  // `isParticipant` to work.
  Response.findById(request.params.response, '_id participant survey answers').exec()
  .then(data => isParticipant(data, request))
  .then(data => data.remove())
  .then((data) => { response.status(200).json(data); })
  .catch(next);
};
