const app = require('express')();
const config = require('./config.js');
const SocketListener = require('./socketio.js');
const db = require('./database.js');

// Middleware
app.use(require('body-parser').urlencoded({ extended: false })); // Parse data sent by clients
app.use(require('body-parser').json()); // Parse data sent by clients
app.use(require('./middleware/session.js')); // track sessions
app.use(require('./middleware/log.js')); // log activity

// Routes
app.use(require('express').static(config.public)); // server static files
app.use('/api', require('./controllers/api.js')); // handle api calls
app.use(require('./middleware/error.js')); // handle errors

// Start the server
if (module.parent) {
  module.exports = app; // Export for testing
} else {
  // Start the server
  const server = app.listen(config.port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Listening on port ${config.port}`);
  });
  SocketListener(server);
}
