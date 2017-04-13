const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
const app = require('../index.js');

describe('Authentication routes', () => {
  describe('/api/login', () => {
    describe('POST', () => {
      it('should return 200 and authenticate the user', () => {

      });

      it('should return 400 for invalid input', () => {

      });
    });

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
  });

  describe('/api/logout', () => {
    describe('POST', () => {
      it('should return 200 and all users', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });
    });

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
  });
});
