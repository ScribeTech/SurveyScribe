const express = require('express');

const auth = require('../controllers/authentication.js');
const survey = require('../controllers/survey.js');
const user = require('../controllers/user.js');

module.exports = (config) => {
  const router = express.Router();
  router.post('/login', auth.login);
  router.post('/logout', auth.logout, auth.isLoggedIn);

  router.route('/api/surveys', auth.isLoggedIn)
  .get(survey.list)
  .post(survey.create);

  router.route('/api/surveys/:survey')
  .get(survey.read)
  .put(survey.update, auth.isLoggedIn)
  .delete(survey.delete, auth.isLoggedIn);

  router.route('/api/users', auth.isLoggedIn)
  .get(user.list)
  .post(user.create);

  router.route('/api/users/:user', auth.isLoggedIn)
  .get(user.read)
  .put(user.update, auth.isSameUser)
  .delete([user.delete, auth.logout], auth.isSameUser);

  // 404: Not Found - Unknown route, or MongoDB Couldn't Find Something
  router.use('/api/*', (error, request, response, next) => {
    if (error &&
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
