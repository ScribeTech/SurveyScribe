const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
const app = require('../index.js');
const User = require('mongoose').model('User');
const MethodNotAllowed = require('./helpers/methodNotAllowed.js');

describe('Authentication routes', () => {
  beforeEach((done) => {
    User.remove({})
    .then(() => User.create({ name: 'testinguser', password: 'testinguser123' }))
    .then(() => done());
  });
  afterEach((done) => {
    User.remove({})
    .then(() => done());
  });
  describe('/api/login', () => {
    describe('POST', () => {
      xit('should return 200 and authenticate the user', () => {

      });

      xit('should return 400 for invalid input', () => {

      });
    });

    describe('GET', MethodNotAllowed('get', '/api/login'));

    describe('PUT', MethodNotAllowed('put', '/api/login'));

    describe('DELETE', MethodNotAllowed('delete', '/api/login'));
  });

  describe('/api/logout', () => {
    describe('POST', () => {
      xit('should return 200 and all users', () => {

      });

      xit('should return 401 if user\'s not authenticated', () => {

      });
    });

    describe('GET', MethodNotAllowed('get', '/api/logout'));

    describe('PUT', MethodNotAllowed('put', '/api/logout'));

    describe('DELETE', MethodNotAllowed('delete', '/api/logout'));
  });
});
