const config = require('../config/default.js');

module.exports = (error, request, response, next) => {
  // Default to a generic 500 error
  const output = {
    status: error.status || 500,
    message: 'Something went wrong. Contact customer support.'
  };
  // Catch unknown routes and MongoDB 'not found' errors
  if (!error || error.value === 'nonexistantresource') {
    output.status = 404;
    output.message = 'Not found';
  } else if (config.debug) {
    // To protect sensitive information, only respond with details in debug mode
    console.error(error);
    output.error = error;
  }
  // Respond in the same format as the request
  response.format({
    json() { response.status(output.status).json(output); },
    default() { response.status(output.status).type('txt').send(output.message); }
  });
};
