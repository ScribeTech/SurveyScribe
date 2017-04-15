const chai = require('chai');
chai.use(require('chai-http'));

chai.use(require('chai-shallow-deep-equal'));
const app = require('../../index.js');
const Survey = require('mongoose').model('Survey');

const { expect } = chai;
const agent = chai.request.agent(app);

module.exports = (METHOD, route, skiplogin) => {
  const method = METHOD.toLowerCase();
  return (
    it('should return 401 if user\'s not authenticated', (done) => {
      const expected = ['get', 'put', 'post', 'delete', 'patch', 'all'];
      expect(expected).to.include(method);
      expect(agent[method]).to.be.a('function');

      const sample = Survey.sample();
      Survey.create(sample)
          .then(() => {
            agent[method](route);
          })
          .then((response) => { done(response); })
          .catch((error) => {
            expect(error).status(401);
            done();
          });
    })
  );
};
