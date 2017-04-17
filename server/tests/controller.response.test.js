const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const app = require('../index.js');
const Response = require('mongoose').model('Response');
const User = require('mongoose').model('User');
const login = require('./helpers/login.js');
const REST = require('./helpers/REST.js');

const { expect, request } = chai;

describe('Response routes', () => {
  beforeEach((done) => {
    Response.remove({})
    .then(() => User.remove({}))
    .then(() => User.create(User.sample()))
    .then(() => done());
  });
  afterEach((done) => {
    Response.remove({})
    .then(() => User.remove({}))
    .then(() => done());
  });
  describe('/api/response', () => {
    describe('GET', () => {
      it('should return 200 and all of this session\'s responses', (done) => {
        const expected = Response.sample();
        const agent = request.agent(app);
        login(agent)
          .then(() => agent.post('/api/responses').send(expected))
          .then(() => agent.get('/api/responses'))
          .then((response) => {
            expect(response).status(200);
            expect(response).to.be.json;
            expect(response.body.length).to.exist;
            console.log('>>> body >>>', response.body);
            expect(response.body[0]).to.shallowDeepEqual(expected);
            done();
          })
          .catch(done);
      });
      xit('should not return other session\'s responses');
    });

    describe('POST', () => {
      it('should return 201 when response is created', (done) => {
        const agent = request.agent(app);
        const expected = Response.sample();
        login(agent)
          .then(() => agent.post('/api/responses').send(expected))
          .then((response) => {
            expect(response).status(201);
            expect(response).to.be.json;
            expect(response.body).to.shallowDeepEqual(expected);
            done();
          })
          .catch(done);
      });

      REST.BadRequest('post', '/api/responses', { invalid: '12345678910' })();
      xit('should return 401 if user\'s not the owner', () => {});
    });
    describe('PUT', REST.MethodNotAllowed('put', '/api/responses'));
    describe('DELETE', REST.MethodNotAllowed('delete', '/api/Responses'));
  });

  xdescribe('/api/response/:response', () => {
    describe('GET', () => {
      it('should return 200 and specified response', (done) => {
        const agent = request.agent(app);
        const expected = Response.sample();
        Response.create(expected)
          .then(() =>
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
          )
          .then(() =>
            agent.get('/api/response/58ee63c65a2d576d5125b4bc')
          )
          .then((response) => {
            expect(response).status(200);
            expect(response).to.be.json;
            expect(response.body).to.shallowDeepEqual(expected);
            done();
          })
          .catch(done);
      });

      REST.NotFound('get', '/api/response/doesnotexist');

      REST.Unauthorized('get', '/api/response/58ee63c65a2d576d5125b4bc')();
    });

    describe('PUT', () => {
      it('should return 200 and update part of the Response', (done) => {
        const agent = request.agent(app);
        const expected = Response.sample();
        Response.create(expected)
          .then(() =>
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
          )
          .then(() =>
            agent.put('/api/Response/58ee63c65a2d576d5125b4bc')
              .send({ title: 'another title' })
          )
          .then((response) => {
            expect(response).status(200);
            expect(response).to.be.json;
            expect(response.body.length);
            expect(response.body[0].title).to.equal('another title');
            done();
          })
          .catch(done);
      });

      REST.BadRequest('put', '/api/Responses/:Response', { invalid: '12345678910' })();
      REST.Unauthorized('put', 'api/Responses/:Response')();
      xit('should return 401 if user\'s not the owner', () => {});
    });

    describe('DELETE', () => {
      it('should return 200 and delete the Response', (done) => {
        const agent = request.agent(app);
        const expected = Response.sample();
        Response.create(expected)
          .then(() =>
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
          )
          .then(() =>
            agent.delete('/api/Response/58ee63c65a2d576d5125b4bc')
          )
          .then((response) => {
            expect(response).status(200);
            expect(response.body.length).to.equal(0);
            done();
          })
          .catch(done);
      });

      REST.Unauthorized('delete', 'api/Responses/:Response')();
      xit('should return 401 if user\'s not the owner', () => {});
    });

    describe('POST', REST.MethodNotAllowed('post', '/api/Responses/:Response'));
  });
});
