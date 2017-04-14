const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect } = chai;
const User = require('mongoose').model('User');
// const Response = require('mongoose').model('Response');
const app = require('../index.js');
const MethodNotAllowed = require('./helpers/methodNotAllowed.js');

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
    describe('GET', () => {
      it('should return 200 and all of current user\'s or session\'s responses', () => {

      });

      it('should return 401 if user\'s not authenticated', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.get('/api/responses/');
          })
          .then((response) => { done(response); })
          .catch((error) => {
            expect(error).status(401);
            done();
          });
      });
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

      it('should return 400 if invalid input', (done) => {
        agent.post('/api/login')
          .send({ name: 'testinguser', password: 'testinguser123' })
          .then(() => {
            agent.post('/api/responses')
              .send({ invalid: 'input' })
              .then(done)
              .catch((error) => {
                expect(error).status(400);
                done();
              });
          });
      });

      it('should return 401 if user\'s not authenticated', (done) => {
        const expected = Response.sample();

        agent.post('/api/responses')
          .send(expected)
          .then(done)
          .catch((error) => {
            expect(error).status(401);
            done();
          });
      });

      it('should return 401 if user\'s not the owner', () => {

      });
    });

    describe('PUT', MethodNotAllowed('put', '/api/responses'));

    describe('DELETE', MethodNotAllowed('delete', '/api/responses'));
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

      it('should return 401 if user\'s not authenticated', (done) => {
        Response.create()
          .then(() => {
            agent.get('/api/responses/58ee6904fdebd16dfdd99f91');
          })
          .then(done)
          .catch((error) => {
            expect(error).status(401);
            done();
          });
      });

      it('should return 401 if user\'s not the owner', () => {

      });

      it('should return 404 if response does not exist', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.get('/api/responses/doesnotexist')
                  .then(done)
                  .catch((error) => {
                    expect(error).status(404);
                    done();
                  });
              });
          });
      });
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

      it('should return 400 if invalid input', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.put('/api/responses/58ee6904fdebd16dfdd99f91')
                  .send({ invalid: 'input' })
                  .then(done)
                  .catch((error) => {
                    expect(error).status(400);
                    done();
                  });
              });
          });
      });

      it('should return 401 if user\'s not authenticated', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.put('/api/responses/58ee6904fdebd16dfdd99f91')
              .send({ answers: [{ value: 'hello' }] });
          })
          .then(() => done())
          .catch((error) => {
            expect(error).status(401);
            done();
          });
      });

      it('should return 401 if user\'s not the owner', () => {

      });
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

      it('should return 404 if response does not exist', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.post('/api/login')
              .send({ name: 'testinguser', password: 'testinguser123' })
              .then(() => {
                agent.delete('/api/responses/doesnotexist')
                  .then(done)
                  .catch((error) => {
                    expect(error).status(404);
                    done();
                  });
              });
          });
      });

      it('should return 401 if user\'s not authenticated', (done) => {
        const expected = Response.sample();

        Response.create(expected)
          .then(() => {
            agent.put('/api/responses/58ee6904fdebd16dfdd99f91')
              .send({ answers: [{ value: 'hello' }] });
          })
          .then(() => done())
          .catch((error) => {
            expect(error).status(401);
            done();
          });
      });

      it('should return 401 if user\'s not the owner', () => {

      });
    });

    describe('POST', MethodNotAllowed('post', '/api/responses/58ee6904fdebd16dfdd99f91'));
  });
});
