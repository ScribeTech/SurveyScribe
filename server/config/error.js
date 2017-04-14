const config = require('./config.js');

// Always serve index when the client tries to access unknown routes
exports.sendIndex = (request, response) => {
  response.sendFile(config.index);
};

// 405: Method not allowed
exports.invalidMethod = (request, response) => {
  response.sendStatus(405);
};

// 404: Not Found - Unknown route, or MongoDB Couldn't Find Something
exports.notFound = (error, request, response, next) => {
  if (error &&
      error.value !== 'nonexistantresource' &&
      error.status !== 404) {
    next(error);
  } else {
    response.status(404).json({ message: 'Not found' });
  }
};

// Do send stack traces in development mode
const development = (error, request, response) => {
  console.error(error);
  response.status(error.status || 500);
  response.json(error);
};

// Don't leak stack traces on the production server
const production = (error, request, response) => {
  response.status(error.status || 500);
  response.send(error.message || 'Something went wrong. Contact customer support.');
};

// 500: Internal Server Error
exports.generic = process.env.NODE_ENV === 'production' ? production : development;
