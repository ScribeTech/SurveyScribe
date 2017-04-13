const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
<<<<<<< HEAD:server/tests/controller.survey.test.js
const app = require('../index.js');
const Survey = require('../models/survey.js');
=======
const app = require('../server/index.js');
const Survey = require('mongoose').model('Survey');
const { MethodNotAllowed } = require('./helpers/methodNotAllowed.js');
>>>>>>> Working on api tests:tests/controller.survey.test.js

describe('Survey routes', () => {
  beforeEach((done) => {
    Survey.remove({}, done); // Empty the database to ensure predictablility
  });
  afterEach((done) => {
    Survey.remove({}, done); // Empty the database to ensure predictablility
  });

  describe('/api/survey', () => {
    describe('GET', () => {
<<<<<<< HEAD:server/tests/controller.survey.test.js
      it('should return 200 and all of user\'s surveys', () => {
=======
      it('should return 200 and all of user\'s surveys', (done) => {
>>>>>>> Working on api tests:tests/controller.survey.test.js
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() =>
            request(app)
              .get('/api/surveys')
              .send({ _name: 'testing', _hash: 'testing' })
          )
          .then((response) => {
            expect(response).status(200);
            expect(response).to.be.json;
            expect(response.body.length);
            expect(response.body[0]).to.shallowDeepEqual(expected);
<<<<<<< HEAD:server/tests/controller.survey.test.js
          });
=======
            done();
          })
          .catch((error) => { done(error); });
>>>>>>> Working on api tests:tests/controller.survey.test.js
      });

      it('should return 401 if user\'s not authenticated', (done) => {
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() =>
            request(app)
              .get('/api/surveys')
          )
          .then((response) => {
            expect(response).status(401);
            done();
          })
          .catch((error) => { done(error); });
      });
    });

    describe('POST', () => {
      it('should return 201 when survey is created', (done) => {
        const expected = Survey.sample();

        request(app)
          .post('/api/surveys')
          .send({ name: 'testing', hash: 'testing' })
          .send(expected)
          .then((response) => {
            expect(response).status(201);
            done();
          })
          .catch((error) => { done(error); });
      });

      it('should return 400 if invalid input', (done) => {
        request(app)
          .post('/api/surveys')
          .send({ name: 'testing', hash: 'testing' })
          .send({ invalid: 'input' })
          .then((response) => {
            expect(response).status(400);
            done();
          })
          .catch((error) => { done(error); });
      });

      it('should return 401 if user\'s not authenticated', (done) => {
        const expected = Survey.sample();

        request(app)
          .post('/api/surveys')
          .send(expected)
          .then((response) => {
            expect(response).status(401);
            expect(response.body).to.not.exist;
            done();
          })
          .catch((error) => { done(error); });
      });

      it('should return 401 if user\'s not the owner', (done) => {

      });
    });

<<<<<<< HEAD:server/tests/controller.survey.test.js
    describe('PUT', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });

    describe('PATCH', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });

    describe('DELETE', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });
=======
    describe('PUT', MethodNotAllowed('put', '/api/surveys'));

    describe('PATCH', MethodNotAllowed('patch', '/api/surveys'));

    describe('DELETE', MethodNotAllowed('delete', '/api/surveys'));
>>>>>>> Working on api tests:tests/controller.survey.test.js
  });

  describe('/api/survey/:survey', () => {
    describe('GET', () => {
      it('should return 200 and specified survey', (done) => {
        const expected = Survey.sample();

        Survey.create(expected)
          .then(() => {
            request(app)
              .get('/api/survey/58ee63c65a2d576d5125b4bc');
          })
          .then((response) => {
            expect(response).status(200);
            expect(response).to.be.json;
            expect(response.body.length);
            expect(response.body).to.shallowDeepEqual(expected);
            done();
          })
          .catch((error) => { done(error); });
      });

      it('should return 404 if survey doesn\'t exist', (done) => {
        request(app)
          .get('app/survey/invalidsurvey')
          .then((response) => {
            expect(response).status(404);
            done();
          })
          .catch((error) => { done(error); });
      });

      it('should return 401 if user\'s not authenticated', (done) => {
        const expected = Survey.sample();

        Survey.create(expected)
          .then(() => {
            request(app)
              .get('/api/survey/58ee63c65a2d576d5125b4bc');
          })
          .then((response) => {
            expect(response).status(401);
            done();
          })
          .catch((error) => { done(error); });
      });
    });

    describe('PATCH', () => {
      it('should return 200 and update part of the survey', () => {

      });

      it('should return 400 if invalid input', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 401 if user\'s not the owner', () => {

      });
    });

    describe('DELETE', () => {
      it('should return 200 and delete the survey', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 401 if user\'s not the owner', () => {

      });
    });

<<<<<<< HEAD:server/tests/controller.survey.test.js
    describe('PUT', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });

    describe('POST', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });
=======
    describe('PUT', MethodNotAllowed('put', '/api/surveys/58ee63c65a2d576d5125b4c5'));

    describe('POST', MethodNotAllowed('post', '/api/surveys/58ee63c65a2d576d5125b4c5'));
>>>>>>> Working on api tests:tests/controller.survey.test.js
  });

  describe('/api/survey/:survey/responses', () => {
    describe('GET', () => {
      it('should return 200 and all of survey\'s responses', () => {

      });

      it('should return 404 if survey doesn\'t exist', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 401 if user\'s not the owner', () => {

      });
    });

<<<<<<< HEAD:server/tests/controller.survey.test.js
    describe('PUT', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });

    describe('PATCH', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });

    describe('DELETE', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });
=======
    describe('PUT', MethodNotAllowed('put', '/api/surveys/58ee63c65a2d576d5125b4c5/responses'));

    describe('PATCH', MethodNotAllowed('patch', '/api/surveys/58ee63c65a2d576d5125b4c5/responses'));

    describe('DELETE', MethodNotAllowed('delete', '/api/surveys/58ee63c65a2d576d5125b4c5/responses'));
>>>>>>> Working on api tests:tests/controller.survey.test.js
  });

  describe('/api/survey/:survey/responses/:response', () => {
    describe('GET', () => {
      it('should return 200 and specified response', () => {

      });

      it('should return 404 if survey doesn\'t exist', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 401 if user\'s not the owner', () => {

      });
    });

<<<<<<< HEAD:server/tests/controller.survey.test.js
    describe('PUT', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });

    describe('PATCH', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });

    describe('DELETE', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });
=======
    describe('PUT', MethodNotAllowed('put', '/api/surveys/58ee63c65a2d576d5125b4c5/responses/58ee6904fdebd16dfdd99f91'));

    describe('PATCH', MethodNotAllowed('patch', '/api/surveys/58ee63c65a2d576d5125b4c5/responses/58ee6904fdebd16dfdd99f91'));

    describe('DELETE', MethodNotAllowed('delete', '/api/surveys/58ee63c65a2d576d5125b4c5/responses/58ee6904fdebd16dfdd99f91'));
>>>>>>> Working on api tests:tests/controller.survey.test.js
  });
});
