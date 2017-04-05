xdescribe('Server', () => {
  it('toggles debug mode automatically');
  it('connects to the database');
  it('listens for connections on the correct port');
  it('serves static files from the public directory');
  it('returns status code 404 for wrong url path');
  it('does not respond with detailed error messages in production mode');
});
