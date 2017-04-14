const express = require('express');

module.exports = (config) => {
  const router = express.Router();

  // 500: Do send stack traces in development mode
  const development = (error, request, response) => {
    console.error(error);
    response.status(error.status || 500);
    response.json(error);
  };

  // 500: Don't leak stack traces on the production server
  const production = (error, request, response) => {
    response.status(error.status || 500);
    response.send(error.message || 'Something went wrong. Contact customer support.');
  };

  router.use(process.env.NODE_ENV === 'production' ? production : development);

  return router;
};
