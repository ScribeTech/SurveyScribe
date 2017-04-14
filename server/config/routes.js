const express = require('express');

const auth = require('../controllers/authentication.js');
const survey = require('../controllers/survey.js');
const user = require('../controllers/user.js');

module.exports = (config) => {
  const router = express.Router();

  router.post('/api/login', auth.login);
  router.post('/api/logout', auth.isLoggedIn, auth.logout);

  router.route('/api/surveys')
  .get(auth.isLoggedIn, survey.list)
  .post(auth.isLoggedIn, survey.create);

  router.route('/api/surveys/:survey')
  .get(survey.read)
  .put(auth.isLoggedIn, survey.update)
  .delete(auth.isLoggedIn, survey.delete);

  router.route('/api/users')
  .get(auth.isLoggedIn, user.list)
  .post(user.create);

  router.route('/api/users/:user')
  .get(user.read)
  .put(auth.isSameUser, user.update)
  .delete(auth.isSameUser, [user.delete, auth.logout]);

  // 404: Not Found - Unknown route, or MongoDB Couldn't Find Something
  router.use('/api/*', (error, request, response, next) => {
    console.log('error routes', error);
    if (error && error.name === 'AssertionError') {
      response.status(400).json({ error: true, message: error.message });
      next(error);
    } else if (error &&
        error.value !== 'nonexistantresource' &&
        error.status !== 404) {
      next(error);
    } else {
      response.status(404).json({ message: 'Not found' });
    }
  });

  // 404: Send unknown routes to index.html
  router.use((request, response) => {
    response.sendFile(config.index);
  });

  return router;
};
