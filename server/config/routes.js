const express = require('express');

const error = require('./error.js');
const auth = require('../controllers/authentication.js');
const survey = require('../controllers/survey.js');
const user = require('../controllers/user.js');
const response = require('../controllers/response.js');

module.exports = () => {
  const router = express.Router();

  router.route('/api/login')
    .post(auth.login)
    .all(error.invalidMethod); // unspecified methods are not allowed

  router.route('/api/logout')
    .post(auth.logout)
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
    .get(survey.response.list)
    .all(error.invalidMethod);

  router.route('/api/surveys/:survey/responses/:response')
    .get(survey.response.read)
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

  router.route('/api/responses/')
    .get(response.list)
    .post(response.create)
    .all(error.invalidMethod);

  router.route('/api/responses/:response')
    .get(response.read)
    .put(response.update)
    .all(error.invalidMethod);

  // Handle Errors
  router.use('/api', error.notFound); // Unknown API routes
  router.use('/api', error.handle); // Exceptions, rejected promises, etc.
  router.use(error.sendIndex); // Send the index page for all client routes

  return router;
};
