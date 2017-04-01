module.exports = {
  port: 8080,
  database: { uri: 'mongodb://localhost/surveyscribe' },
  log: './logs/access.log',
  debug: process.env.NODE_ENV !== 'production'
};
