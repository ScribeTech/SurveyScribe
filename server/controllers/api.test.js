process.env.NODE_ENV = 'test';

const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
const app = require('../index.js');
const Survey = require('../models/survey.js');

module.exports = () => {
  beforeEach((done) => {
    // Empty the database before each test to ensure tests behave predictably
    Survey.remove({}, done);
  });
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
          done();
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
          done();
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
          done();
        });
    });
  });
  describe('GET /api/surveys/:id', () => {
    it('responds with a 404 status code for non-existant resources', (done) => {
      request(app)
        .get('/api/surveys/nonexistantresource')
        .end((error, response) => {
          expect(response).status(404);
          done();
        });
    });
    it('GETs a survey with the given id', (done) => {
      // Add example data before making a request
      const survey = { title: 'Example Survey', questions: [{ label: 'What is your favorite color?', options: [{ label: 'Red', value: 0 }, { label: 'Green', value: 0 }, { label: 'Blue', value: 0 }] }, { label: 'Which do you like more?', options: [{ label: 'Dogs', value: 0 }, { label: 'Cats', value: 0 }] }] };
      Survey.create(survey)
      .then(result => request(app).get(`/api/surveys/${result._id}`))
      .then((response) => {
        expect(response.body).to.shallowDeepEqual(survey);
        done();
      })
      .catch(done); // call "done" if the promise is rejected (see error.js)
    });
  });
  describe('/PUT/:id survey', () => {
    it('PUTs a survey with the given id', (done) => {
      // Add example data before making a request
      const initial = { title: 'Example Survey', questions: [{ label: 'What is your favorite color?', options: [{ label: 'Red', value: 0 }, { label: 'Green', value: 0 }, { label: 'Blue', value: 0 }] }, { label: 'Which do you like more?', options: [{ label: 'Dogs', value: 0 }, { label: 'Cats', value: 0 }] }] };
      const final = { title: 'Example Survey', questions: [{ label: 'Do you weigh more than a duck?', options: [{ label: 'Yes', value: 0 }, { label: 'No', value: 0 }] }] };
      let id; // TODO: use promise.join or similar from bluebird
      Survey.create(initial)
      .then((result) => {
        id = result._id;
        return request(app).put(`/api/surveys/${id}`).send(final);
      })
      .then(result => request(app).get(`/api/surveys/${id}`))
      .then((response) => {
        expect(response.body).to.shallowDeepEqual(final);
        done();
      })
      .catch(done); // call "done" if the promise is rejected (see error.js)
    });
    xit('does not overwrite undefined properties', () => {});
  });
  xdescribe('DELETE /api/surveys/:surveyID', () => {
    xit('deletes the survey', () => {});
  });
};
