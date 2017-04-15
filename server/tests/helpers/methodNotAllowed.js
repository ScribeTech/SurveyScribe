const chai = require('chai');
chai.use(require('chai-http'));

chai.use(require('chai-shallow-deep-equal'));
const app = require('../../index.js');

const { expect } = chai;
const agent = chai.request.agent(app);

module.exports = (METHOD, route, skiplogin) => (
  () => {
    const method = METHOD.toLowerCase();
    it('should return 405 METHOD NOT ALLOWED', (done) => {
      const user = { name: 'testinguser', password: 'testinguser123' };
      agent.post('/api/login').send(user)
      .then(() => {
        const expected = ['get', 'put', 'post', 'delete', 'patch', 'all'];
        expect(expected).to.include(method);
        expect(agent[method]).to.be.a('function');
        return agent[method](route);
      })
      .catch((response) => {
        expect(response).status(405);
        done();
      })
      .catch(done);
    });
  }
);
