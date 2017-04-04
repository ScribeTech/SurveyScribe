const config = require('./config/default.js');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.Promise = require('bluebird');

const app = express();
mongoose.connect(config.database.uri, config.database.options);

// Parse data sent by clients
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log activity
app.use(require('./middleware/log.js'));

// Route requests
app.use('/', express.static(path.join(__dirname, config.public)));
app.use('/api', require('./controllers/api.js'));

// Handle errors
app.use(require('./middleware/error.js'));

// Finally
if (module.parent) {
  // Export for testing
  module.exports = app;
} else {
  // Start the server
  app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
}
