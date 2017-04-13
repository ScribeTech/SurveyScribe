const chai = require('chai');
chai.use(require('chai-http'));

const { expect, request } = chai;
const app = require('../index.js');
// const Response = require('mongoose').model('Response');

xdescribe('Response routes', () => {
  beforeEach((done) => {
    Response.remove({}, done); // Empty the database to ensure predictablility
  });
  afterEach((done) => {
    Response.remove({}, done); // Empty the database to ensure predictablility
  });

  describe('/api/responses', () => {
    describe('GET', () => {
      it('should return 200 and all of current user\'s or session\'s responses', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });
    });

    describe('POST', () => {
      it('should return 201 and creates response', () => {

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

  describe('/api/responses/:response', () => {
    describe('GET', () => {
      it('should return 200 and specified response', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 401 if user\'s not the owner', () => {

      });

      it('should return 404 if response does not exist', () => {

      });
    });

    describe('PATCH', () => {
      it('should return 200 and update part of response', () => {

      });

      it('should return 400 if invalid input', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 401 if user\'s not the owner', () => {

      });
    });

    describe('DELETE', () => {
      it('should return 200 and delete the response', () => {

      });

      it('should return 404 if response does not exist', () => {

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
});
