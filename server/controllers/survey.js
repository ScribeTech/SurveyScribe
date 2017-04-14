const Survey = require('../models/survey.js');

exports.list = (request, response, next) => {
  const _id = request.session.user;
  Survey.find({ _id }).exec()
    .then((data) => { response.status(200).json(data); })
    .catch(next);
};

exports.create = (request, response, next) => {
  Survey.create(request.body)
  .then((data) => { response.status(201).json(data); })
  .catch(next);
};

exports.read = (request, response, next) => {
  Survey.findById(request.params.survey).exec()
  .then((data) => {
    if (data) {
      response.status(200).json(data);
    } else {
      next({ status: 404 });
    }
  })
  .catch(next);
};

exports.update = (request, response, next) => {
  const _id = request.params.survey;
  Survey.update({ _id }, request.body).exec()
  .then((result) => { response.status(200).json(result); })
  .catch(next);
};

exports.delete = (request, response, next) => {
  Survey.findByIdAndRemove(request.params.survey).exec()
  .then((data) => {
    if (data) {
      response.status(200).json(data);
    } else {
      next({ status: 404 });
    }
  })
  .catch(next);
};
