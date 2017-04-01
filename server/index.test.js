// const request = require('request');

// const url = 'http://localhost:8080';

describe('Server', () => {
  describe('GET /', () => {
    it('returns status code 200', () => {
      // request.get(url, (err, res) => {
      //   expect(res.statusCode).toBe(200);
      //   done();
      // });
    });
  });

  it('returns status code 404 for wrong url path', () => {
    // request.get(url.concat('doesNotExist'), (err, res) => {
    //   expect(res.statusCode).toBe(404);
    //   done();
    // });
  });

  it('loads settings from config.js', () => {
    // port
    // database
    // public
    // log
    // debug
  });
  it('toggles debug mode automatically', () => { /* no-op */ });
  it('connects to the database', () => { /* no-op */ });
  it('listens for connections on the correct port', () => { /* no-op */ });
  it('serves static files from the public directory', () => { /* no-op */ });
  it('does not respond with detailed error messages in production mode', () => { /* no-op */ });
});
