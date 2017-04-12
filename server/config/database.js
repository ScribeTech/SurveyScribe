const mongoose = require('mongoose');
const Promise = require('bluebird');

module.exports = (config) => {
  mongoose.Promise = Promise;
  mongoose.connect(config.database.uri, config.database.options)
  .then(() => console.log('Database connected'))
  .catch(() => console.error('Database failed to connect'));
  return mongoose.connection;
};
