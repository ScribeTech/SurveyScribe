process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const app = require('./index.js');

describe('API', () => {
  xdescribe('GET /api/surveys', () => {
    it('responds with all surveys', () => {});
    it('responds with information about related resources', () => {});
  });
  xdescribe('POST /api/surveys', () => {
    it('creates a survey', () => {});
    it('redirects to the newly created survey', () => {});
  });
  describe('GET /api/surveys/:surveyID', () => {
    it('responds with a 404 status code for non-existant resources', (done) => {
      request(app)
        .get('/api/surveys/nonexistantresource')
        .end((error, response) => {
          expect(response).status(404);
          done();
        });
    });
    xit('responds with the requested survey', () => {});
    xit('responds with information about related resources', () => {});
  });
  xdescribe('PUT /api/surveys/:surveyID', () => {
    it('updates the survey', () => {});
    it('updates the survey title', () => {});
    it('adds a question to the survey', () => {});
    it('updates a question in the survey', () => {});
    it('deletes a question from the survey', () => {});
    it('adds a response to the survey', () => {});
    it('does not overwrite responses when editing a question', () => {});
  });
  xdescribe('DELETE /api/surveys/:surveyID', () => {
    it('deletes the survey', () => {});
  });
});

xdescribe('Server', () => {
  describe('Static File Server', () => {
    it('returns status code 200', () => {});
    it('returns status code 404 for wrong url path', () => {});
  });
  it('loads settings from config.js', () => { /* port, database, public, log, debug */ });
  it('toggles debug mode automatically', () => {});
  it('connects to the database', () => {});
  it('listens for connections on the correct port', () => {});
  it('serves static files from the public directory', () => {});
  it('does not respond with detailed error messages in production mode', () => {});
});
