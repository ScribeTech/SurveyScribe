const config = require('./config/default.js');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const error = require('./middleware/error.js');
const api = require('./controllers/api.js');

const app = express();
mongoose.connect(config.database.uri, config.database.options);

// Parse data sent by clients
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log activity
const log = fs.createWriteStream(path.join(__dirname, config.log), { flags: 'a' });
app.use(morgan('combined', { stream: log }));

// Route requests
app.use('/', express.static(path.join(__dirname, config.public)));
app.use('/api', api);

// Handle errors
app.use(error);

// Finally
if (module.parent) {
  // Export for testing
  module.exports = app;
} else {
  // Start the server
  app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
}
