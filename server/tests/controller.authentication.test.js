const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;

const app = require('../index.js');
const User = require('mongoose').model('User');
<<<<<<< HEAD
const MethodNotAllowed = require('./helpers/methodNotAllowed.js');
const Unauthorized401 = require('./helpers/Unauthorized.js');
=======

const REST = require('./helpers/REST.js');
>>>>>>> 332941507ae91b0e305c63425a757fdcf54a2eb5

describe('Authentication routes', () => {
  beforeEach((done) => {
    User.remove({})
    .then(() => User.create(User.sample()))
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

    describe('GET', REST.MethodNotAllowed('get', '/api/login'));

    describe('PUT', REST.MethodNotAllowed('put', '/api/login'));

    describe('DELETE', REST.MethodNotAllowed('delete', '/api/login'));
  });

  describe('/api/logout', () => {
    describe('POST', () => {
      xit('should return 200 and all users', () => {

      });

      Unauthorized401('post', '/api/logout');
    });

    describe('GET', REST.MethodNotAllowed('get', '/api/logout'));

    describe('PUT', REST.MethodNotAllowed('put', '/api/logout'));

    describe('DELETE', REST.MethodNotAllowed('delete', '/api/logout'));
  });
});
