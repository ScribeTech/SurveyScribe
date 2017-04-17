const chai = require('chai');
chai.use(require('chai-http'));

const { expect, request } = chai;

const app = require('../index.js');
const User = require('../models/user.js');

const REST = require('./helpers/REST.js');

describe('User routes', () => {
  beforeEach((done) => {
    User.remove({})
    .then(() => User.create(User.sample()))
    .then(() => done());
  });
  afterEach((done) => {
    User.remove({})
    .then(() => done());
  });

  describe('/api/users', () => {
    describe('GET', () => {
      xit('should return 200 and all users', () => {});

      REST.Unauthorized('get', '/api/users')();
    });

    describe('POST', () => {
      xit('should return 201 and create new user', () => {});
      xit('should return 409 if username already exists', () => {});

      REST.BadRequest('post', '/api/users', { invalid: true })();
    });

    describe('PUT', REST.MethodNotAllowed('put', '/api/users'));
    describe('DELETE', REST.MethodNotAllowed('delete', '/api/users'));
  });

  xdescribe('/api/users/:user', () => {
    describe('GET', () => {
      xit('should return 200 and specified user', () => {});

      REST.Unauthorized('get', '/api/users/:user')();
      REST.NotFound('get', '/api/users/:user')();
    });

    describe('PUT', () => {
      REST.BadRequest('put', '/api/users/:user', { invalid: true })();
      REST.Unauthorized('put', '/api/users/:user')();
      REST.NotFound('put', '/api/users/:user')();

      xit('should return 401 if user does not equal current user', () => {});
    });

    describe('DELETE', () => {
      xit('should return 200 log out and delete the user', () => {});
      xit('should return 401 if user does not equal current user', () => {});

      REST.Unauthorized('delete', '/api/users/:user')();
      REST.NotFound('delete', '/api/users/:user')();
    });

    describe('POST', REST.MethodNotAllowed('post', '/api/users/:user'));
  });
});
