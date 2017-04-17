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
  describe('/api/responses', () => {
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
    });
    describe('PUT', REST.MethodNotAllowed('put', '/api/responses'));
    describe('DELETE', REST.MethodNotAllowed('delete', '/api/Responses'));
  });

  describe('/api/responses/:response', () => {
    describe('GET', () => {
      it('should return 200 and specified response', (done) => {
        const agent = request.agent(app);
        const expected = Response.sample();
        login(agent)
        .then(() => agent.post('/api/responses/').send(expected))
        .then(response => agent.get(`/api/responses/${response.body._id}`))
        .then((response) => {
          expect(response).status(200);
          expect(response).to.be.json;
          expect(response.body).to.shallowDeepEqual(expected);
          done();
        })
        .catch(done);
      });

      it('should return 401 if user\'s not the owner', (done) => {
        const agent = request.agent(app);
        login(agent)
        .then(() => Response.create(Response.sample()))
        .then(doc => agent.get(`/api/responses/${doc._id}`))
        .catch((response) => {
          expect(response).status(401);
          done();
        })
        .catch(done);
      });

      REST.NotFound('get', '/api/response/doesnotexist');
    });

    xdescribe('PUT', () => {
      it('should return 200 and update part of the Response', (done) => {
        const agent = request.agent(app);
        const initial = Response.sample();
        const answers = [
          { kind: 'Scale', value: 3 },
          { kind: 'Text', value: 'New answer' },
          { kind: 'Select', value: ['Sk0RuYzRl'] }
        ];
        const update = Object.assign({}, initial, { answers });
        login(agent)
        .then(() => agent.post('/api/responses/').send(initial))
        .then(response => agent.put(`/api/responses/${response.body._id}`).send(update))
        .then((response) => {
          expect(response).status(200);
          expect(response).to.be.json;
          expect(response.body.answers).to.be.an('array');
          expect(response.body.answers[0].value).to.equal(3);
          expect(response.body.answers[1].value).to.equal('New answer');
          expect(response.body.answers[2].value).to.be.an('array');
          expect(response.body.answers[2].value[0]).to.equal('Sk0RuYzRl');
          done();
        })
        .catch(done);
      });

      it('should return 401 if user\'s not the owner', (done) => {
        const agent = request.agent(app);
        const sample = Response.sample();
        login(agent)
        .then(() => Response.create(sample))
        .then(doc => agent.put(`/api/responses/${doc._id}`).send(sample))
        .catch((response) => {
          expect(response).status(401);
          done();
        })
        .catch(done);
      });

      it('should return 400 BAD REQUEST for invalid inputs', (done) => {
        const agent = request.agent(app);
        const initial = Response.sample();
        const badData = { invalid123: 'r32krl2k3rklarl3r' };
        login(agent)
        .then(() => agent.post('/api/responses').send(initial))
        .then(response => agent.put(`/api/responses/${response.body._id}`).send(badData))
        .then((response) => {
          expect(response).status(400);
          done();
        })
        .catch(done);
      });
    });

    xdescribe('DELETE', () => {
      it('should return 200 and delete the response', (done) => {
        const agent = request.agent(app);
        const initial = Response.sample();
        let ID;

        login(agent)
        .then(() => agent.post('/api/responses/').send(initial))
        .then((response) => { ID = response.body._id; return response; })
        .then(() => agent.delete(`/api/responses/${ID}`))
        .then((response) => {
          expect(response).status(200);
          expect(response).to.be.json;
        })
        .then(() => agent.get(`/api/responses/${ID}`))
        .catch((response) => {
          expect(response).status(404);
          done();
        })
        .catch(done);
      });

      it('should return 401 if user\'s not the owner', (done) => {
        const agent = request.agent(app);
        const sample = Response.sample();
        login(agent)
        .then(() => Response.create(sample))
        .then(doc => agent.put(`/api/responses/${doc._id}`).send(sample))
        .catch((response) => {
          expect(response).status(401);
          done();
        })
        .catch(done);
      });

      REST.Unauthorized('delete', 'api/Responses/:Response')();
    });

    describe('POST', REST.MethodNotAllowed('post', '/api/Responses/:Response'));
  });
});
