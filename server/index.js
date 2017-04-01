const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config.js');
const api = require('./controllers/api.js');

const app = express();
mongoose.connect(config.database);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', api);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
