<<<<<<< HEAD
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
=======
const express = require('express');
const config = require('./config/config.js');
require('./config/database.js')(config);

const app = express();
>>>>>>> (refactor) Server

// Middleware
app.use(require('helmet')());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());
app.use(require('./middleware/session.js')(config)); // track sessions
app.use(require('./middleware/log.js')(config)); // log activity

// Routes
<<<<<<< HEAD
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
=======
app.use(express.static(config.public)); // static files
app.use(require('./config/routes.js')(config));
app.use(require('./config/error.js')(config)); // error handling
>>>>>>> (refactor) Server

// Server
if (module.parent) { module.exports = app; /* export for testing */ } else {
  app.listen(config.port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Listening on port ${config.port}`);
  });
}
