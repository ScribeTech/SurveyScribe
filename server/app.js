const config = require('./config.js');
const express = require('express');
const path = require('path');

const app = express();

// Static File Server
app.use('/', express.static(path.join(__dirname, '../public')));
app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
