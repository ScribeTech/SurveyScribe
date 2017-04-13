const User = require('../models/user.js');

exports.login = (request, response) => {
  const name = request.body.name;
  const password = request.body.password;
  User.findOne({ name }, 'name hash')
  .then((user) => {
    if (!user) { throw Error('User not found'); }
    if (!user.verifyPassword(password)) { throw Error('Wrong password'); }
    request.session.regenerate(() => { request.session.user = user.id; });
    response.status(200).send({ name });
  })
  .catch((error) => {
    console.error(error);
    response.sendStatus(403);
  });
};

exports.logout = (request, response) => {
  request.session.destroy();
  response.sendStatus(200);
};

exports.required = (request, response, next) => {
  next();
};
