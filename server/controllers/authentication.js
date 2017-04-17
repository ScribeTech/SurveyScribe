const assert = require('assert');
const User = require('../models/user.js');

exports.login = (request, response) => {
  const name = request.body.name;
  const password = request.body.password;
  User.findOne({ name }, '_id name hash')
  .then((user) => {
    assert.ok(user, 'User not found');
    assert.ok(user.verifyPassword(password), 'Wrong password');
    const _id = user._id;
    request.session.regenerate(() => {
      request.session.user = _id;
      response.status(200).send({ name, _id });
    });
  })
  .catch((error) => {
    response.status(400).json({ error: error.message });
  });
};

exports.logout = (request, response) => {
  request.session.destroy();
  response.sendStatus(200);
};

exports.isLoggedIn = (request, response, next) => {
  console.log('request', request);
  if (request.session.user) {
    next();
  } else {
    response.sendStatus(401);
  }
};

exports.isSameUser = (request, response, next) => {
  if (request.session.user &&
      request.params.user &&
      request.session.user === request.params.user) {
    next();
  } else {
    response.sendStatus(401);
  }
};
