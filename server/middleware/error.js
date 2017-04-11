const config = require('../config.js');
const express = require('express');
const path = require('path');

const router = express.Router();

/* Handle Unknown Resources */

router.use((request, response) => {
  response.format({
    html() {
      // Send index.html for requests to unknown pages
      response.sendFile(path.join(__dirname, '..', config.public, 'index.html'));
    },
    default() { response.status(404).send('Not found'); }
  });
});

/* Handle Errors */

// Show stack traces for debugging on a development server
const development = (error, request, response) => {
  response.status(error.status || 500);
  response.format({
    json() { response.json(error); },
    default() { response.send(error.message); }
  });
};

// Don't leak stack traces on the production server
const production = (error, request, response) => {
  response.status(error.status || 500);
  response.send(error.message || 'Something went wrong. Contact customer support.');
};

router.use(config.debug ? development : production);

module.exports = router;
