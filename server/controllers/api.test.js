process.env.NODE_ENV = 'test';

const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));
const survey = require('../models/survey.js');

const { expect, request } = chai;
const app = require('../index.js');

module.exports = () => {
  describe('/GET survey', () => {
    it('GETs all surveys', (done) => {
      const expected = {
        title: 'Test',
        questions: [{
          label: 'TestLabel',
          options: [{
            label: 'TestLabel1',
            value: 1
          }]
        }]
      };

      request(app)
        .post('/api/surveys')
        .send(expected)
        .end();

      request(app)
        .get('/api/surveys')
        .end((error, response) => {
          expect(response).status(200);
          expect(response.body.length).to.exist;
          expect(response.body[0]).to.shallowDeepEqual(expected);
        });

      survey.remove({ title: 'Test' })
        .then(() => {
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
  describe('/POST survey', () => {
    it('POSTs an empty survey', (done) => {
      request(app)
        .post('/api/surveys')
        .send({
          title: '',
          questions: [{
            label: '',
            options: [{
              label: '',
              value: 0
            }]
          }]
        })
        .end((error, response) => {
          expect(response).status(201);
        });

      survey.remove({ title: '' })
        .then(() => {
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

    it('POSTs a full survey', (done) => {
      request(app)
        .post('/api/surveys')
        .send({
          title: 'Test',
          questions: [{
            label: 'Test',
            options: [{
              label: 'TestLabel1',
              value: 2
            }, {
              label: 'TestLabel2',
              value: 3
            }, {
              label: 'TestLabel3',
              value: 4
            }, {
              label: 'TestLabel4',
              value: 1
            }]
          }]
        })
        .end((error, response) => {
          expect(response).status(201);
        });

      survey.remove({ title: 'Test' })
        .then(() => {
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
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
