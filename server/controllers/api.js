const api = require('express').Router();
const auth = require('../middleware/authentication.js');

api.use('/surveys', auth, require('./survey.js'));
api.use('/users', auth, require('./user.js'));

// Handle unknown API requests
api.use((error, request, response, next) => {
  if (!error || error.value === 'nonexistantresource' || Number(error.status) === 404) {
    response.status(404).json({ message: 'Not found' });
  } else {
    next(error);
  }
});

module.exports = api;
