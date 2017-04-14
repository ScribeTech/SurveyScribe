const path = require('path');
const assert = require('assert');

const root = path.normalize(path.join(__dirname, '/../../'));
const settings = {};

settings.default = {
  root,
  port: 8000,
  database: { uri: 'mongodb://localhost/surveyscribe' },
  public: path.join(root, './public'),
  index: path.join(root, './public/index.html'),
  log: path.join(root, './server/logs/access.log'),
  session: { secret: 'RANDOM SECRET KEY', secure: false }
};

settings.development = {};

settings.test = {
  database: { uri: 'mongodb://localhost/surveyscribe-test' },
  log: './server/logs/test.log',
};

settings.production = {
  database: {
    uri: process.env.dbURI || 'mongodb://localhost/',
    options: {
      db: process.env.db || 'surveyscribe',
      user: process.env.dbUser,
      pass: process.env.dbPass
    }
  },
  session: {
    secret: process.env.sessionSecret || settings.default.session.secret,
    secure: true
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = Object.assign({}, settings.default, exports[env]);

// Do not allow the default session secret in production
if (env === 'production') {
  const actual = module.exports.session.secret;
  const expected = settings.default.session.secret;
  assert.notEqual(actual, expected, 'Fatal Error: a session secret must be set');
}
