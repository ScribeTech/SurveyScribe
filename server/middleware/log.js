const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const config = require('../config/default.js');

try {
  const log = fs.createWriteStream(path.join(__dirname, config.log), { flags: 'a' });
  module.exports = morgan('combined', { stream: log });
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('Created log file');
  } else {
    throw error;
  }
}
