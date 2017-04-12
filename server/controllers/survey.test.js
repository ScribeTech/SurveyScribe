const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
const app = require('../index.js');
const Survey = require('../models/survey.js');

describe('Survey Controller', () => {
  beforeEach((done) => {
    Survey.remove({}, done); // Empty the database to ensure predictablility
  });
  afterEach((done) => {
    Survey.remove({}, done); // Empty the database to ensure predictablility
  });
  describe('/GET survey', () => {
    it('GETs all surveys', (done) => {
      const expected = Survey.sample();
      Survey.create(expected)
      .then(() => request(app).get('/api/surveys'))
      .then((response) => {
        expect(response).status(200);
        expect(response).to.be.json;
        expect(response.body.length);
        expect(response.body[0]).to.shallowDeepEqual(expected);
        done();
      })
      .catch(done);
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
            votes: 0
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
      .send(Survey.sample())
      .end((error, response) => {
        expect(response).status(201);
        expect(response).to.be.json;
        done();
      });
    });
  });
  describe('GET /api/surveys/:survey', () => {
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
      const expected = Survey.sample();
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
  describe('/PUT/:survey', () => {
    it('PUTs a survey with the given id', (done) => {
      const seed = Survey.sample();
      const expected = { title: 'Example Survey', questions: [{ label: 'Do you weigh more than a duck?', options: [{ label: 'Yes', votes: 0 }, { label: 'No', votes: 0 }] }] };
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
  describe('DELETE /api/surveys/:survey', () => {
    it('deletes the survey', (done) => {
      const seed = Survey.sample();
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
      .end((error, response) => {
        expect(response).status(404);
        done();
      });
    });
  });
});
