const User = require('../models/user.js');

exports.list = (request, response, next) => {
  User.find({ }).exec()
    .then((data) => { response.status(200).json(data); })
    .catch(next);
};

exports.create = (request, response, next) => {
  User.create(request.body)
  .then((data) => { response.status(201).json(data); })
  .catch((error) => {
    console.log('error user create', error);
    next(error);
  })
  .catch(next);
};

exports.read = (request, response, next) => {
  User.findById(request.params.user).exec()
  .then((data) => { response.status(200).json(data); })
  .catch(next);
};

exports.update = (request, response, next) => {
  const _id = request.session.user;
  Response.update({ _id }, request.body).exec()
  .then((result) => { response.status(200).json(result); })
  .catch(next);
};

exports.delete = (request, response, next) => {
  User.findByIdAndRemove(request.session.user).exec()
  .then((data) => { response.status(200).json(data); })
  .catch(next);
};
