const User = require('../models/user.js');

exports.login = (request, response) => {
  const name = request.body.name;
  const password = request.body.password;
  User.findOne({ name }, 'hash+')
  .then((user) => {
    if (!user) { throw Error('User not found'); }
    if (!user.verifyPassword(password)) { throw Error('Wrong password'); }
    request.session.regenerate(() => { request.session.user = user.id; });
    response.status(200).send({ name });
  })
  .catch((error) => {
    console.error(error);
    response.status(403).json({ error });
  });
};

exports.logout = (request, response) => {
  request.session.destroy();
  response.sendStatus(200);
};

exports.isLoggedIn = (request, response, next) => {
  if (request.session.user) {
    console.log(request.session.user);
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
