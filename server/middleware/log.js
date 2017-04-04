const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const config = require('../config/default.js');

const filepath = path.join(__dirname, '/../', config.log.file);
const stream = fs.createWriteStream(filepath, { flags: 'a' });

// Make sure the application doesn't die if there's a file error
stream.on('error', (error) => { console.error(error); });

module.exports = morgan(config.log.format, { stream });
