const config = require('./config.js');

// Always serve index when the client tries to access unknown routes
exports.sendIndex = (request, response) => {
  response.sendFile(config.index);
};

// 404: Not Found
exports.notFound = (request, response, next) => {
  next(404); // trigger an express error
};

// 405: Method not allowed
exports.invalidMethod = (request, response, next) => {
  next(405); // trigger an express error
};

// Catch exceptions and rejected promises
exports.handle = (error, request, response, next) => {
  let status = 500;
  let message = 'Something went wrong. Contact our support team.';

  if (error.value === 'nonexistantresource' ||
      error.status === 404 ||
      error === 404) {
    status = 404;
    message = 'Not found';
  } else if (error.name === 'AssertionError' ||
             error.name === 'StrictModeError' ||
             error.name === 'ValidatorError' ||
             error.name === 'ValidationError' ||
             error === 400) {
    status = 400;
    message = error.message || 'Bad request';
  } else if (error.status === 401 || error === 401) {
    status = 401;
    message = 'Unauthorized';
  } else if (error === 405) {
    status = 405;
    message = 'Method not allowed';
  } else if (process.env.NODE_ENV === 'development') {
    // Output the error
    setTimeout(() => console.error(error), 0);
  }
  response.status(status).json({ error: true, message });
};
