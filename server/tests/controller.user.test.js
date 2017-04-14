const chai = require('chai');
chai.use(require('chai-http'));

const { expect, request } = chai;

const app = require('../index.js');
const User = require('../models/user.js');
const MethodNotAllowed = require('./helpers/methodNotAllowed.js');

describe('User routes', () => {
  beforeEach((done) => {
    User.remove({}, done); // Empty the database to ensure predictablility
  });
  afterEach((done) => {
    User.remove({}, done); // Empty the database to ensure predictablility
  });

  describe('/api/users', () => {
    describe('GET', () => {
      it('should return 200 and all users', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });
    });

    describe('POST', () => {
      it('should return 201 and create new user', () => {

      });

      it('should return 400 if invalid input', () => {

      });

      it('should return 409 if username already exists', () => {

      });
    });

    describe('PUT', MethodNotAllowed('put', '/api/users'));

    describe('DELETE', MethodNotAllowed('delete', '/api/users'));
  });

  describe('/api/users/:user', () => {
    describe('GET', () => {
      it('should return 200 and specified user', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 404 if user does not exist', () => {

      });
    });

    describe('PUT', () => {
      it('should return 201 and create new user', () => {

      });

      it('should return 400 if invalid input', () => {

      });

      it('should return 401 if user does not equal current user', () => {

      });
    });

    describe('DELETE', () => {
      it('should return 200 log out and delete the user', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 401 if user does not equal current user', () => {

      });
    });

    describe('POST', MethodNotAllowed('post', '/api/users/notallowed'));
  });
});
