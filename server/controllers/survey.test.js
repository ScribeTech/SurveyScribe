const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
const app = require('../index.js');
const Survey = require('mongoose').model('Survey');

describe('Survey routes', () => {
  beforeEach((done) => {
    Survey.remove({}, done); // Empty the database to ensure predictablility
  });
  afterEach((done) => {
    Survey.remove({}, done); // Empty the database to ensure predictablility
  });

  describe('/api/survey', () => {
    describe('GET', () => {
      it('should return 200 and all of user\'s surveys', () => {
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() => request(app).get('/api/surveys'))
          .then((response) => {
            expect(response).status(200);
            expect(response).to.be.json;
            expect(response.body.length);
            expect(response.body[0]).to.shallowDeepEqual(expected);
          });
      });

      it('should return 401 if user\'s not authenticated', () => {

      });
    });

    describe('POST', () => {
      it('should return 201 when survey is created', () => {

      });

      it('should return 400 if invalid input', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 401 if user\'s not the owner', () => {

      });
    });

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
  });

  describe('/api/survey/:survey', () => {
    describe('GET', () => {
      it('should return 200 and specified survey', () => {

      });

      it('should return 404 if survey doesn\'t exist', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

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

    describe('PUT', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });

    describe('POST', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });
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
  });
});
