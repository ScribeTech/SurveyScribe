process.env.NODE_ENV = 'test';

const chai = require('chai');
chai.use(require('chai-http'));

const { expect, request } = chai;
const app = require('../index.js');

module.exports = () => {
  xdescribe('GET /api/surveys', () => {
    xit('responds with all surveys', () => {});
    xit('responds with information about related resources', () => {});
  });
  xdescribe('POST /api/surveys', () => {
    xit('creates a survey', () => {});
    xit('redirects to the newly created survey', () => {});
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
    xit('updates the survey', () => {});
    xit('updates the survey title', () => {});
    xit('adds a question to the survey', () => {});
    xit('updates a question in the survey', () => {});
    xit('deletes a question from the survey', () => {});
    xit('adds a response to the survey', () => {});
    xit('does not overwrite responses when editing a question', () => {});
  });
  xdescribe('DELETE /api/surveys/:surveyID', () => {
    xit('deletes the survey', () => {});
  });
};
