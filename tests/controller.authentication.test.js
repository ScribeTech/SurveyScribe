const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
<<<<<<< HEAD
const app = require('../server/index.js');
const { MethodNotAllowed } = require('./helpers/methodNotAllowed.js');
=======
const app = require('../index.js');
>>>>>>> Routes test skeleton

describe('Authentication routes', () => {
  describe('/api/login', () => {
    describe('POST', () => {
      it('should return 200 and authenticate the user', () => {

      });

      it('should return 400 for invalid input', () => {

      });
    });

<<<<<<< HEAD
    describe('GET', MethodNotAllowed('get', '/api/login'));

    describe('PUT', MethodNotAllowed('put', '/api/login'));

    describe('DELETE', MethodNotAllowed('delete', '/api/login'));
=======
    describe('GET', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

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
>>>>>>> Routes test skeleton
  });

  describe('/api/logout', () => {
    describe('POST', () => {
      it('should return 200 and all users', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });
    });

<<<<<<< HEAD
    describe('GET', MethodNotAllowed('get', '/api/logout'));

    describe('PUT', MethodNotAllowed('put', '/api/logout'));

    describe('DELETE', MethodNotAllowed('delete', '/api/logout'));
=======
    describe('GET', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

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
>>>>>>> Routes test skeleton
  });
});
