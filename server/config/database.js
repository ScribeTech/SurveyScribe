const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

module.exports = (config) => {
  mongoose.connect(config.database.uri, config.database.options)
  .then(() => console.log('Database connected'))
  .catch(() => console.error('Database failed to connect'));
  return mongoose.connection;
};
