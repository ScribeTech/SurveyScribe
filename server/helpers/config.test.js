describe('Configuration', () => {
  it('always loads default settings');
  it('overwites default values with mode values');
  it('uses default values where mode values are not specified');
  it('does not fail if there is no file for the selected mode');
  it('tries to load `config/development.js` in development mode');
  it('tries to load `config/test.js` in test mode');
  it('tries to load `config/staging.js` in staging mode');
  it('tries to load `config/production.js` in production mode');
});
