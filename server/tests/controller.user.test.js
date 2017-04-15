const chai = require('chai');
chai.use(require('chai-http'));

const { expect, request } = chai;

const app = require('../index.js');
const User = require('../models/user.js');

const MethodNotAllowed = require('./helpers/methodNotAllowed.js');

describe('User routes', () => {
  beforeEach((done) => {
    User.remove({})
    .then(() => User.create({ name: 'testinguser', password: 'testinguser123' }))
    .then(() => done());
  });
  afterEach((done) => {
    User.remove({})
    .then(() => done());
  });

  describe('/api/users', () => {
    describe('GET', () => {
      xit('should return 200 and all users', () => {

      });

      xit('should return 401 if user\'s not authenticated', () => {

      });
    });

    describe('POST', () => {
      xit('should return 201 and create new user', () => {

      });

      xit('should return 400 if invalid input', () => {

      });

      xit('should return 409 if username already exists', () => {

      });
    });

    describe('PUT', MethodNotAllowed('put', '/api/users'));

    describe('DELETE', MethodNotAllowed('delete', '/api/users'));
  });

  describe('/api/users/:user', () => {
    xdescribe('GET', () => {
      it('should return 200 and specified user', () => {

      });

      it('should return 401 if user\'s not authenticated', () => {

      });

      it('should return 404 if user does not exist', () => {

      });
    });

    xdescribe('PUT', () => {
      it('should return 201 and create new user', () => {

      });

      it('should return 400 if invalid input', () => {

      });

      it('should return 401 if user does not equal current user', () => {

      });
    });

    xdescribe('DELETE', () => {
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
