const Promise = require('bluebird');

const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const app = require('../../index.js');
const login = require('./login.js');

const { expect, request } = chai;

exports.Error = (status, METHOD, route, data, auth = true) => {
  const agent = request.agent(app);
  expect(METHOD).to.be.a('string');
  const method = METHOD.toLowerCase();
  expect(['get', 'put', 'post', 'delete', 'patch', 'all']).to.include(method);
  expect(agent[method]).to.be.a('function');
  return (done) => {
    (auth ? login(agent) : Promise.resolve())
      .then(() => agent[method](route).send(data))
      .then(done) // fail the test if there is no error
      .catch((response) => {
        expect(response).status(status);
        done(); // test passes!
      })
      .catch(done); // fail the test if there are uncaught errors
  };
};
