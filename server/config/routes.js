const express = require('express');

const auth = require('../controllers/authentication.js');
const survey = require('../controllers/survey.js');
const user = require('../controllers/user.js');

module.exports = (config) => {
  const router = express.Router();
  router.post('/login', auth.login);
  router.post('/logout', auth.logout);

  router.route('/api/surveys', auth.required)
  .get(survey.list)
  .post(survey.create);

  router.route('/api/surveys/:survey', auth.required)
  .get(survey.read)
  .put(survey.update)
  .delete(survey.delete);

  router.route('/api/users', auth.required)
  .get(user.list)
  .post(user.create);

  router.route('/api/users/:user', auth.required)
  .get(user.read)
  .put(user.update)
  .delete(user.delete);

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
