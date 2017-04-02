describe('API', () => {
  describe('GET /api/surveys', () => {
    it('responds with all surveys', () => { /* no-op */ });
    it('responds with information about related resources', () => { /* no-op */ });
  });
  describe('POST /api/surveys', () => {
    it('creates a survey', () => { /* no-op */ });
    it('redirects to the newly created survey', () => { /* no-op */ });
  });
  describe('GET /api/surveys/:survey_id', () => {
    it('responds with the requested survey', () => { /* no-op */ });
    it('responds with information about related resources', () => { /* no-op */ });
  });
  describe('GET non-existant survey', () => {
    it('responds with a 404 status code', () => { /* no-op */ });
  });
  describe('PUT /api/surveys/:survey_id', () => {
    it('updates the survey', () => { /* no-op */ });
    it('updates the survey title', () => { /* no-op */ });
    it('adds a question to the survey', () => { /* no-op */ });
    it('updates a question in the survey', () => { /* no-op */ });
    it('deletes a question from the survey', () => { /* no-op */ });
    it('adds a response to the survey', () => { /* no-op */ });
    it('does not overwrite responses when editing a question', () => { /* no-op */ });
  });
  describe('DELETE /api/surveys/:survey_id', () => {
    it('deletes the survey', () => { /* no-op */ });
  });
});
