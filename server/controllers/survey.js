const Survey = require('../models/survey.js');

exports.list = (request, response, next) => {
  const _id = request.session.user;
  Survey.find({ owners: { $in: [_id] } }, '_id title').exec()
    .then((data) => { response.status(200).json(data); })
    .catch(next);
};

exports.create = (request, response, next) => {
  // Add the current user as an owner before creating the survey
  const survey = Object.assign({}, request.body, { owners: [request.session.user] });
  Survey.create(survey)
  .then((data) => { response.status(201).json(data); })
  .catch((error) => {
    if (error.name === 'StrictModeError') {
      response.sendStatus(400);
    } else {
      next(error);
    }
  });
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
  .catch((error) => {
    if (error.name === 'StrictModeError') {
      response.sendStatus(400);
    } else {
      next(error);
    }
  });
};

exports.update = (request, response, next) => {
  const _id = request.params.survey;
  Survey.update({ _id }, request.body, { runValidators: true }).exec()
  .then((result) => { response.status(200).json(result); })
  .catch((error) => { console.error(">>> 400 ERROR"); response.sendStatus(400); });
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
