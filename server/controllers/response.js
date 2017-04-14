const Response = require('../models/response.js');

exports.list = (request, response, next) => {
  const participant = request.sessionID;
  Response.find({ participant }).exec()
    .then((data) => { response.status(200).json(data); })
    .catch(next);
};

exports.create = (request, response, next) => {
  Response.create(request.body)
  .then((data) => { response.status(201).json(data); })
  .catch(next);
};

exports.read = (request, response, next) => {
  Response.findById(request.params.response).exec()
  .then((data) => { response.status(200).json(data); })
  .catch(next);
};

exports.update = (request, response, next) => {
  const _id = request.params.response;
  // force mongoose to run validators and throw an error if there is bad data
  Response.update({ _id }, request.body).exec()
  .then((result) => { response.status(200).json(result); })
  .catch(next);
};

exports.delete = (request, response, next) => {
  Response.findByIdAndRemove(request.params.survey).exec()
  .then((data) => { response.status(200).json(data); })
  .catch(next);
};
