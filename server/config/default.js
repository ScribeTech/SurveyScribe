module.exports = {
  port: 8080,
  database: { uri: 'mongodb://localhost/surveyscribe' },
  public: '../public',
  log: { format: 'combined', file: './logs/access.log' },
  debug: true
};
