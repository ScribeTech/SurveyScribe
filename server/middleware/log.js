const fs = require('fs');
const morgan = require('morgan');

module.exports = (config) => {
  const stream = fs.createWriteStream(config.log, { flags: 'a' });
  stream.on('error', (error) => { console.error(error); });
  return morgan('combined', { stream });
};
