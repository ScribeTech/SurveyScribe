const express = require('express');
const config = require('../config/config.js');

const router = express.Router();

// 404: NOT FOUND
router.use((request, response, next) => {
  response.status(404)
          .type('txt')
          .send('Not found');
});

// 500: INTERNAL SERVER ERROR
router.use((error, request, response, next) => {
  response.status(error.status || 500);
  if (config.debug) {
    // Only respond with detailed errors in development mode. Sending details
    // from a live server could expose sensitive information to hackers.
    console.error(error);
    response.type('txt').send(error);
  } else {
    response.type('txt').send('Something went wrong. Try again, or contact support.');
  }
});

module.exports = router;
