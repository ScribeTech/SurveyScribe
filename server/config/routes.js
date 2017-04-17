const express = require('express');

const error = require('./error.js');
const auth = require('../controllers/authentication.js');
const survey = require('../controllers/survey.js');
const user = require('../controllers/user.js');

module.exports = () => {
  const router = express.Router();

  router.route('/api/login')
    .post(auth.login)
    .all(error.invalidMethod); // unspecified methods are not allowed

  router.route('/api/logout')
    .post(auth.isLoggedIn, auth.logout)
    .all(error.invalidMethod);

  router.route('/api/surveys')
    .get(auth.isLoggedIn, survey.list)
    .post(auth.isLoggedIn, survey.create)
    .all(error.invalidMethod);

  router.route('/api/surveys/:survey')
    .get(survey.read)
    .put(auth.isLoggedIn, survey.update)
    .delete(auth.isLoggedIn, survey.delete)
    .all(error.invalidMethod);

  router.route('/api/surveys/:survey/responses')
    .get(survey.responses)
    .all(error.invalidMethod);

  router.route('/api/users')
    .get(auth.isLoggedIn, user.list)
    .post(user.create)
    .all(error.invalidMethod);

  router.route('/api/users/:user')
    .get(auth.isLoggedIn, user.read)
    .put(auth.isLoggedIn, user.update)
    .delete(auth.isLoggedIn, [user.delete, auth.logout])
    .all(error.invalidMethod);

  router.use('/api/*', error.notFound); // 404: Not Found
  router.use('/api/*', error.badRequest);
  router.use(error.sendIndex); // always send the index for client routes
  router.use(error.generic); // 500: Internal Server Error

  return router;
};
