describe('Authentication', () => {
  it('responds with 403 forbidden to unauthenticated users that try to access authenticated routes');
  describe('Client', () => {
    it('redirects unauthenticated users to the login page for all authenticated routes');
    it('sends the user back to the page they were trying to access before authentication');
    it('does not send the user to the login page after successful authetnication');
  });
});
