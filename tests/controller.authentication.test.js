const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
<<<<<<< HEAD
<<<<<<< HEAD
const app = require('../server/index.js');
const { MethodNotAllowed } = require('./helpers/methodNotAllowed.js');
=======
const app = require('../index.js');
>>>>>>> Routes test skeleton
=======
const app = require('../server/index.js');
const { MethodNotAllowed } = require('./helpers/methodNotAllowed.js');
>>>>>>> Working on tests

describe('Authentication routes', () => {
  describe('/api/login', () => {
    describe('POST', () => {
      it('should return 200 and authenticate the user', () => {

      });

      it('should return 400 for invalid input', () => {

      });
    });

<<<<<<< HEAD
<<<<<<< HEAD
    describe('GET', MethodNotAllowed('get', '/api/login'));

    describe('PUT', MethodNotAllowed('put', '/api/login'));

    describe('DELETE', MethodNotAllowed('delete', '/api/login'));
=======
    describe('GET', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {
=======
    describe('GET', MethodNotAllowed('get', '/api/login'));
>>>>>>> Working on tests

    describe('PUT', MethodNotAllowed('put', '/api/login'));

<<<<<<< HEAD
      });
    });

    describe('DELETE', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });
>>>>>>> Routes test skeleton
=======
    describe('DELETE', MethodNotAllowed('delete', '/api/login'));
>>>>>>> Working on tests
  });

  describe('/api/logout', () => {
    describe('POST', () => {
      it('should return 200 and all users', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });
    });

<<<<<<< HEAD
<<<<<<< HEAD
    describe('GET', MethodNotAllowed('get', '/api/logout'));

    describe('PUT', MethodNotAllowed('put', '/api/logout'));

    describe('DELETE', MethodNotAllowed('delete', '/api/logout'));
=======
    describe('GET', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {
=======
    describe('GET', MethodNotAllowed('get', '/api/logout'));
>>>>>>> Working on tests

    describe('PUT', MethodNotAllowed('put', '/api/logout'));

<<<<<<< HEAD
      });
    });

    describe('DELETE', () => {
      it('should return 405 METHOD NOT ALLOWED', () => {

      });
    });
>>>>>>> Routes test skeleton
=======
    describe('DELETE', MethodNotAllowed('delete', '/api/logout'));
>>>>>>> Working on tests
  });
});
