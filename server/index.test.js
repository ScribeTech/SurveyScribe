xdescribe('Server', () => {
  it('toggles debug mode automatically');
  it('connects to the database');
  it('listens for connections on the correct port');
  it('serves static files from the public directory');
  it('returns status code 404 for wrong url path');
  it('does not respond with detailed error messages in production mode');
  it('warns if the session secret has not been changed from the default');
  it('exits if the session secret has not been changed in production mode');
  it('/api should not response with HTML for unknown routes');
});
