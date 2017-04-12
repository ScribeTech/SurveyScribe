const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-shallow-deep-equal'));

const { expect, request } = chai;
const app = require('../index.js');

xdescribe('Routes', () => {
  const routes = [
    { path: '/api/surveys', methods: ['get', 'post'] },
    { path: '/api/surveys/:survey', methods: ['get', 'put', 'delete'] },
    { path: '/api/users', methods: ['get', 'post'] },
    { path: '/api/users/:user', methods: ['get', 'put', 'delete'] }
  ];
  routes.forEach((route) => {
    route.methods.forEach((method) => {
      describe(route.path, () => {
        it('responds with 403 for unauthenticated users', (done) => {
          request(app)[method](route.path)
          .then((response) => {
            expect(response).status(403);
            done();
          })
          .catch(done);
        });
        it('responds normally for authenticated users', (done) => {
          request(app)[method](route.path)
          .then((response) => {
            expect(response).status(200);
            done();
          })
          .catch(done);
        });
      });
    });
  });
  it('responds normally for authenticate users', () => {});
});
