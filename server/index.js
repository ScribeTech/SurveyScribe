const config = require('./config/config.js');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const error = require('./middleware/error.js');
const api = require('./controllers/api.js');

// Express
const app = express();

// Access log
const log = fs.createWriteStream(path.join(__dirname, config.log), { flags: 'a' });

// Database
mongoose.connect(config.database.uri, config.database.options);

// Middleware
app.use(morgan('combined', { stream: log }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', api);

// Error Handler
app.use(error);

// Server
app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
