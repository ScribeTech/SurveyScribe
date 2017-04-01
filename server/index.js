const config = require('./config.js');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const api = require('./controllers/api.js');

const app = express();
const log = fs.createWriteStream(path.join(__dirname, config.log), { flags: 'a' });
mongoose.connect(config.database.uri, config.database.options);

// Middleware
app.use(morgan('combined', { stream: log }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', api);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
