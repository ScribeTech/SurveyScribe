const app = require('express')();
const config = require('./config.js');
const db = require('./database.js');
const SocketListener = require('./socketio.js');

// Middleware
app.use(require('body-parser').urlencoded({ extended: false })); // Parse data sent by clients
app.use(require('body-parser').json()); // Parse data sent by clients
app.use(require('./middleware/session.js')); // track sessions
app.use(require('./middleware/log.js')); // log activity

// Routes
app.use(require('express').static(config.public)); // server static files
app.use('/api', require('./controllers/api.js')); // handle api calls
app.use(require('./middleware/error.js')); // handle errors

// Server
if (module.parent) {
  module.exports = app; // export for testing
} else {
  const server = app.listen(config.port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Listening on port ${config.port}`);
  });
  SocketListener(server);
}
