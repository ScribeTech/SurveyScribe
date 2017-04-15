const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect } = chai;
const User = require('mongoose').model('User');
// const Response = require('mongoose').model('Response');
const app = require('../index.js');
const REST = require('./helpers/REST.js');

const agent = chai.request.agent(app);

xdescribe('Response routes', () => {
  beforeEach((done) => {
    Response.remove({})
      .then(() => User.remove({}))
      .then(() => User.create({ name: 'testinguser', password: 'testinguser123' }))
      .then(() => done());
  });
  afterEach((done) => {
    Response.remove({})
      .then(() => User.remove({}))
      .then(() => done());
  });

  describe('/api/responses', () => {
    xdescribe('GET', () => {
      it('should return 200 and all of current user\'s or session\'s responses', () => {});
    });

    describe('POST', () => {
      it('should return 201 and creates response', (done) => {
        const expected = Response.sample();

        agent.post('/api/login')
          .send({ name: 'testinguser', password: 'testinguser123' })
          .then(() => {
            agent.post('/api/responses')
              .send(expected)
              .then((response) => {
                expect(response).status(201);
                expect(response).to.be.json;
                expect(response.body.length);
                expect(response.body[0]).to.shallowDeepEqual(expected);
                done();
              })
              .catch(done);
          });
      });

      REST.BadRequest('post', '/api/responses', { invalid: 'input' })();
    });

    describe('PUT', REST.MethodNotAllowed('put', '/api/responses'));
    describe('DELETE', REST.MethodNotAllowed('delete', '/api/responses'));
  });

  describe('/api/responses/:response', () => {
    describe('GET', () => {
      it('should return 200 and specified response', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.get('/api/responses/58ee6904fdebd16dfdd99f91')
                  .then((response) => {
                    expect(response).status(200);
                    expect(response).to.be.json;
                    expect(response.body.length);
                    expect(response.body[0]).to.shallowDeepEqual(expected);
                    done();
                  })
                  .catch(done);
              });
          });
      });

      xit('should return 401 if user\'s not the owner', () => {});

      REST.NotFound('get', '/api/responses/:response')();
    });

    describe('PUT', () => {
      it('should return 200 and update part of response', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.put('/api/responses/58ee6904fdebd16dfdd99f91')
                  .send({ answers: [{ value: 'hello' }] })
                  .then((response) => {
                    expect(response).status(200);
                    expect(response).to.be.json;
                    expect(response.body.length);
                    expect(response.body[0].answers[0].value).to.equal('hello');
                    done();
                  })
                  .catch(done);
              });
          });
      });

      REST.BadRequest('put', '/api/responses/58ee6904fdebd16dfdd99f91', { invalid: 'input' })();
      REST.Unauthorized('put', '/api/responses/58ee6904fdebd16dfdd99f91')();
      xit('should return 401 if user\'s not the owner', () => {});
    });

    describe('DELETE', () => {
      it('should return 200 and delete the response', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.delete('/api/responses/58ee6904fdebd16dfdd99f91')
                  .then((response) => {
                    expect(response).status(200);
                    done();
                  })
                  .catch(done);
              });
          });
      });

      xit('should return 401 if user\'s not the owner', () => {});

      REST.NotFound('delete', '/api/responses/:responses')();
    });

    describe('POST', REST.MethodNotAllowed('post', '/api/responses/58ee6904fdebd16dfdd99f91'));
  });
});
