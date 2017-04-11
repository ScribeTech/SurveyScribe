const app = require('express')();
const config = require('./config.js');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

const express = require('express');
const bodyParser = require('body-parser');
const SocketListener = require('./socketio.js');

// Initialize the app
const app = express();
>>>>>>> (refactor) Socket.io organization
=======
const SocketListener = require('./socketio.js');
>>>>>>> (refactor) import style
const db = require('./database.js');
<<<<<<< HEAD
const SocketListener = require('./socketio.js');
=======
>>>>>>> (refactor) routes
=======
const db = require('./database.js');
const SocketListener = require('./socketio.js');
>>>>>>> (refactor) miscellaneous

// Middleware
app.use(require('body-parser').urlencoded({ extended: false })); // Parse data sent by clients
app.use(require('body-parser').json()); // Parse data sent by clients
app.use(require('./middleware/session.js')); // track sessions
app.use(require('./middleware/log.js')); // log activity

// Routes
<<<<<<< HEAD
<<<<<<< HEAD
app.use(require('express').static(config.public)); // server static files
=======
app.use(express.static(config.public)); // server static files
>>>>>>> (refactor) routes
=======
app.use(require('express').static(config.public)); // server static files
>>>>>>> (refactor) import style
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
