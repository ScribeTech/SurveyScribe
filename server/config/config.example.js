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
  port: 8080,
  database: { uri: 'mongodb://localhost/surveyscribe-production' },
  session: {
    secret: 'RANDOM SECRET KEY',
    secure: true
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = Object.assign({}, settings.default, settings[env]);

// Do not allow the default session secret in production
if (env === 'production') {
  const actual = module.exports.session.secret;
  const expected = settings.default.session.secret;
  if (actual === expected) {
    console.error('Fatal Error: a session secret must be set');
    process.exit(1);
  }
}
