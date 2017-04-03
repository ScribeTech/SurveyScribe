process.env.NODE_ENV = 'test';

describe('API', require('./controllers/api.test.js'));

xdescribe('Server', () => {
  it('loads settings from config.js', () => { /* port, database, public, log, debug */ });
  it('toggles debug mode automatically', () => {});
  it('connects to the database', () => {});
  it('listens for connections on the correct port', () => {});
  it('serves static files from the public directory', () => {});
  it('returns status code 404 for wrong url path', () => {});
  it('does not respond with detailed error messages in production mode', () => {});
});
