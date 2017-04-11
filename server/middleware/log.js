const fs = require('fs');
const morgan = require('morgan');
const config = require('../config.js');

const stream = fs.createWriteStream(config.log, { flags: 'a' });
// Make sure the application doesn't die if there's a file error
stream.on('error', (error) => { console.error(error); });

module.exports = morgan('combined', { stream });
