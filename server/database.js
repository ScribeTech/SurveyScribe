const config = require('./config.js');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(config.database.uri, config.database.options)
.then(() => { console.log('Connected to mongoDB'); })
.catch((error) => {
  console.error('Database connection failed.');
  if (config.debug) { throw error; } else { process.exit(1); }
});

module.exports = mongoose;
