const express = require('express');
const config = require('./config/config.js');
require('./config/database.js')(config);

const app = express();

// Middleware
app.use(require('body-parser').urlencoded({ extended: false })); // Parse data sent by clients
app.use(require('body-parser').json()); // Parse data sent by clients
app.use(require('./middleware/session.js')(config)); // track sessions
app.use(require('./middleware/log.js')(config)); // log activity

// Routes
app.use(express.static(config.public)); // server static files
app.use('/api', require('./config/routes.js')(config)); // handle api calls
app.use(require('./config/error.js')(config)); // handle errors

// Server
if (module.parent) { module.exports = app; /* export for testing */ } else {
  app.listen(config.port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Listening on port ${config.port}`);
  });
}
