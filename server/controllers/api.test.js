process.env.NODE_ENV = 'test';

const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
const app = require('../index.js');
const Survey = require('../models/survey.js');

module.exports = () => {
  beforeEach((done) => {
    Survey.remove({}, done); // Empty the database to ensure predictablility
  });
  afterEach((done) => {
    Survey.remove({}, done); // Empty the database to ensure predictablility
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
          expect(response).to.be.json;
          expect(response.body.length);
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
          expect(response).to.be.json;
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
          expect(response).to.be.json;
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
          expect(response).to.be.json;
          done();
        });
    });
    it('GETs a survey with the given id', (done) => {
      // Add example data
      const expected = { title: 'Example Survey', questions: [{ label: 'What is your favorite color?', options: [{ label: 'Red', value: 0 }, { label: 'Green', value: 0 }, { label: 'Blue', value: 0 }] }, { label: 'Which do you like more?', options: [{ label: 'Dogs', value: 0 }, { label: 'Cats', value: 0 }] }] };
      Survey.create(expected)
      .then(result => request(app).get(`/api/surveys/${result._id}`))
      .then((response) => {
        expect(response).status(200);
        expect(response).to.be.json;
        expect(response.body).to.shallowDeepEqual(expected);
        done();
      })
      .catch(done); // call "done" if the promise is rejected (see error.js)
    });
  });
  describe('/PUT/:id survey', () => {
    it('PUTs a survey with the given id', (done) => {
      const seed = { title: 'Example Survey', questions: [{ label: 'What is your favorite color?', options: [{ label: 'Red', value: 0 }, { label: 'Green', value: 0 }, { label: 'Blue', value: 0 }] }, { label: 'Which do you like more?', options: [{ label: 'Dogs', value: 0 }, { label: 'Cats', value: 0 }] }] };
      const expected = { title: 'Example Survey', questions: [{ label: 'Do you weigh more than a duck?', options: [{ label: 'Yes', value: 0 }, { label: 'No', value: 0 }] }] };
      const id = Survey.create(seed).then(result => result._id);
      id.then(surveyID => request(app).put(`/api/surveys/${surveyID}`).send(expected));
      id.then(surveyID => request(app).get(`/api/surveys/${surveyID}`))
      .then((response) => {
        expect(response).status(200);
        expect(response).to.be.json;
        expect(response.body).to.shallowDeepEqual(expected);
        done();
      })
      .catch(done); // call "done" if the promise is rejected (see error.js)
    });
    xit('does not overwrite undefined properties', () => {});
  });
  describe('DELETE /api/surveys/:id', () => {
    it('deletes the survey', (done) => {
      const seed = { title: 'Example Survey', questions: [{ label: 'What is your favorite color?', options: [{ label: 'Red', value: 0 }, { label: 'Green', value: 0 }, { label: 'Blue', value: 0 }] }, { label: 'Which do you like more?', options: [{ label: 'Dogs', value: 0 }, { label: 'Cats', value: 0 }] }] };
      Survey.create(seed)
      .then(result => (
        request(app).delete(`/api/surveys/${result._id}`)
        .then((response) => {
          expect(response).status(200);
          expect(response).to.be.json;
          return request(app).get(`/api/surveys/${result._id}`);
        })
        .catch((error) => { expect(error).status(404); })
        .then(done)
      ))
    .catch(done); // call "done" if the promise is rejected (see error.js)
    });
    it('responds with a 404 status code for non-existant resources', (done) => {
      request(app).delete('/api/surveys/nonexistantresource')
      .end((response) => {
        expect(response).status(404);
        done();
      });
    });
  });
};
