const config = require('../config.js');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('../database.js');

module.exports = session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: config.sessionSecret,
  store: new MongoStore({ mongooseConnection: db })
});

// TODO: warn if the session secret has not been changed from the default
// TODO: exit if the session secret has not been changed in production mode
