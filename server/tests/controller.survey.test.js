const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const app = require('../index.js');
const Survey = require('mongoose').model('Survey');
const User = require('mongoose').model('User');
const login = require('./helpers/login.js');
const REST = require('./helpers/REST.js');

const { expect, request } = chai;

describe('Survey routes', () => {
  beforeEach((done) => {
    Survey.remove({})
    .then(() => User.remove({}))
    .then(() => User.create(User.sample()))
    .then(() => done());
  });
  afterEach((done) => {
    Survey.remove({})
    .then(() => User.remove({}))
    .then(() => done());
  });
  describe('/api/survey', () => {
    describe('GET', () => {
      it('should return 200 and all of user\'s surveys', (done) => {
        const expected = Survey.sample();
        const agent = request.agent(app);
        login(agent)
          .then(() => Survey.create(expected))
          .then(() => agent.get('/api/surveys'))
          .then((response) => {
            expect(response).status(200);
            expect(response).to.be.json;
            expect(response.body.length);
            expect(response.body[0]).to.shallowDeepEqual(expected);
            done();
          })
          .catch(done);
      });
      REST.Unauthorized('get', '/api/surveys')();
    });

    describe('POST', () => {
      it('should return 201 when survey is created', (done) => {
        const agent = request.agent(app);
        const expected = Survey.sample();
        login(agent)
          .then(() => agent.post('/api/surveys').send(expected))
          .then((response) => {
            expect(response).status(201);
            expect(response).to.be.json;
            expect(response.body.length);
            expect(response.body[0]).to.shallowDeepEqual(expected);
            done();
          })
          .catch(done);
      });

      REST.BadRequest('post', '/api/surveys', { invalid: '12345678910' })();
      REST.Unauthorized('post', '/api/surveys')();
      xit('should return 401 if user\'s not the owner', (done) => {});
    });
    describe('PUT', REST.MethodNotAllowed('put', '/api/surveys'));
    describe('DELETE', REST.MethodNotAllowed('delete', '/api/surveys'));
  });

  xdescribe('/api/survey/:survey', () => {
    describe('GET', () => {
      it('should return 200 and specified survey', (done) => {
        const agent = request.agent(app);
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.get('/api/survey/58ee63c65a2d576d5125b4bc')
                  .then((response) => {
                    expect(response).status(200);
                    expect(response).to.be.json;
                    expect(response.body).to.shallowDeepEqual(expected);
                    done();
                  })
                  .catch(done);
              });
          });
      });

      it('should return 404 if survey doesn\'t exist', (done) => {
        const agent = request.agent(app);
        agent.post('/api/login')
          .send({ name: 'testinguser', password: 'testinguser123' })
          .then(() => {
            agent.get('app/survey/invalidsurvey')
              .then((response) => {
                expect(response).status(404);
              })
              .catch(done);
          });
      });

      REST.Unauthorized('get', '/api/survey/:survey')();
    });

    describe('PUT', () => {
      it('should return 200 and update part of the survey', (done) => {
        const agent = request.agent(app);
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.put('/api/survey/58ee63c65a2d576d5125b4bc')
                  .send({ title: 'another title' })
                  .then((response) => {
                    expect(response).status(200);
                    expect(response).to.be.json;
                    expect(response.body.length);
                    expect(response.body[0].title).to.equal('another title');
                    done();
                  })
                  .catch(done);
              });
          });
      });

      REST.BadRequest('put', '/api/surveys/:survey', { invalid: '12345678910' })();
      REST.Unauthorized('put', 'api/surveys/:survey')();
      xit('should return 401 if user\'s not the owner', () => {});
    });

    describe('DELETE', () => {
      it('should return 200 and delete the survey', (done) => {
        const agent = request.agent(app);
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.delete('/api/survey/58ee63c65a2d576d5125b4bc')
                  .then((response) => {
                    expect(response).status(200);
                    expect(response.body.length).to.equal(0);
                    done();
                  })
                  .catch(done);
              });
          });
      });

      REST.Unauthorized('delete', 'api/surveys/:survey')();
      xit('should return 401 if user\'s not the owner', () => {});
    });

    describe('POST', REST.MethodNotAllowed('post', '/api/surveys/:survey'));
  });

  xdescribe('/api/survey/:survey/responses', () => {
    describe('GET', () => {
      it('should return 200 and all of survey\'s responses', (done) => {
        const agent = request.agent(app);
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() =>
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.get('/api/surveys/58ee63c65a2d576d5125b4bc/responses')
                  .then((response) => {
                    expect(response).status(200);
                    expect(response).to.be.json;
                    expect(response.body.length);
                    done();
                  })
                  .catch(done);
              })
          );
      });

      it('should return 404 if survey doesn\'t exist', (done) => {
        const agent = request.agent(app);
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() =>
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.get('/api/surveys/doesnotexist/responses')
                  .then((response) => {
                    expect(response).status(404);
                    done();
                  })
                  .catch(done);
              })
          );
      });

      REST.Unauthorized('get', '/api/survey/:survey/responses')();
      xit('should return 401 if user\'s not the owner', () => {});
    });

    describe('PUT', REST.MethodNotAllowed('put', '/api/surveys/:survey/responses'));
    describe('DELETE', REST.MethodNotAllowed('delete', '/api/surveys/:survey/responses'));
  });

  xdescribe('/api/survey/:survey/responses/:response', () => {
    describe('GET', () => {
      it('should return 200 and specified response', (done) => {
        const agent = request.agent(app);
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() =>
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.get('/api/surveys/58ee63c65a2d576d5125b4c5/responses/58ee6904fdebd16dfdd99f91')
                  .then((response) => {
                    expect(response).status(200);
                    expect(response).to.be.json;
                    expect(response.body.length);
                    done();
                  })
                  .catch(done);
              })
          );
      });

      it('should return 404 if survey doesn\'t exist', (done) => {
        const agent = request.agent(app);
        const expected = Survey.sample();
        Survey.create(expected)
          .then(() =>
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.get('/api/surveys/58ee63c65a2d576d5125b4c5/responses/doesnotexist')
                  .then((response) => {
                    expect(response).status(404);
                    done();
                  })
                  .catch(done);
              })
          );
      });

      REST.Unauthorized('get', '/api/survey/:survey/responses/:response');
      xit('should return 401 if user\'s not the owner', () => {});
    });
    describe('POST', REST.MethodNotAllowed('post', '/api/surveys/:survey/responses/:response'));
    describe('PUT', REST.MethodNotAllowed('put', '/api/surveys/:survey/responses/:response'));
    describe('DELETE', REST.MethodNotAllowed('delete', '/api/surveys/:survey/responses/:response'));
  });
});
