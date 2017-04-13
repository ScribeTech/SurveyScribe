const mongooseConnection = require('mongoose').connection;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// TODO: warn if the session secret has not been changed from the default
// TODO: exit if the session secret has not been changed in production mode

module.exports = config => session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // create session even before something is stored
  secret: config.session.secret,
  store: new MongoStore({ mongooseConnection })
});
