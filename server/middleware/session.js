const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// TODO: warn if the session secret has not been changed from the default
// TODO: exit if the session secret has not been changed in production mode

module.exports = config => session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: config.session.secret,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
});
