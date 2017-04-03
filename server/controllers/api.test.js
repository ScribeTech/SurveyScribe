process.env.NODE_ENV = 'test';

// Require dev-dependancies
const chai = require('chai');
chai.use(require('chai-http'));

const { expect, request } = chai;
const app = require('../index.js');

module.exports = () => {
  xdescribe('/GET survey', () => {
    xit('GETs all surveys', () => {});
  });
  xdescribe('/POST survey', () => {
    xit('POSTs an empty survey', () => {});
  });
  describe('/GET/:id survey', () => {
    it('responds with a 404 status code for non-existant resources', (done) => {
      request(app)
        .get('/api/surveys/nonexistantresource')
        .end((error, response) => {
          expect(response).status(404);
          done();
        });
    });
    xit('GETs a survey with the given id', () => {});
  });
  xdescribe('/PUT/:id survey', () => {
    xit('PUTs a survey with the given id', () => {});
    xit('updates the survey title', () => {});
    xit('adds a question to the survey', () => {});
    xit('updates a question in the survey', () => {});
    xit('deletes a question from the survey', () => {});
    xit('adds a response to the survey', () => {});
    xit('does not overwrite responses when editing a question', () => {});
  });
  xdescribe('/DELETE/:id survey', () => {
    xit('DELETEs a survey with the given id', () => {});
  });
};
