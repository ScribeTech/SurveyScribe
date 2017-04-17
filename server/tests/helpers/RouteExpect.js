const Promise = require('bluebird');

const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const app = require('../../index.js');
const login = require('./login.js');

const { expect, request } = chai;

// Build a function that makes a request and runs tests on the response
const Response = (METHOD, route, data, auth, callback) => {
  // Keep cookies between requests
  const agent = request.agent(app);
  // Make sure the specified method is valid
  expect(METHOD).to.be.a('string');
  const method = METHOD.toLowerCase();
  expect(['get', 'put', 'post', 'delete', 'patch', 'all']).to.include(method);
  expect(agent[method]).to.be.a('function');
  // Return a function that Mocha can use as an asynchronous test
  return (done) => {
    // Log in if `auth` is set to true
    (auth ? login(agent) : Promise.resolve())
      // Send the request with the specified method, route, and request body
      .then(() => agent[method](route).send(data))
      // The promise will be rejected if there are 400 or 500 HTTP errors,
      // but we still want to run our callback function.
      .catch(error => error)
      .then(callback)
      // The test fails if the first argument of `done()` defined. Thus, our
      // callback function should return undefined if the tests passed. If any
      // errors occurred, the catch statement will pass that error into the
      // first argument of `done`. We're using this awkward hack because we don't
      // have access to bluebird's `.finally()` method for some reason.
      .catch(error => error)
      .then(done);
  };
};

const Status = (status, method, route, data, auth = true) => (
  Response(method, route, data, auth, (response) => {
    expect(response).status(status);
    // expect(response).to.be.json;
    return undefined; // the test passed!
  })
);

exports.Response = Response;
exports.Status = Status;
