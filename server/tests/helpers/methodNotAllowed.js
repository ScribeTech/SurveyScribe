const chai = require('chai');
chai.use(require('chai-http'));

const { expect, request } = chai;
const app = require('../../server/index.js');

exports.MethodNotAllowed = (method, route) => {
  if (method === 'put') {
    return (
      it('should return 405 METHOD NOT ALLOWED', (done) => {
        request(app).put(route)
          .then((response) => {
            expect(response).status(405);
            done();
          })
          .catch((error) => { done(error); });
      })
    );
  } else if (method === 'delete') {
    return (
      it('should return 405 METHOD NOT ALLOWED', (done) => {
        request(app).delete(route)
          .then((response) => {
            expect(response).status(405);
            done();
          })
          .catch((error) => { done(error); });
      })
    );
  } else if (method === 'post') {
    return (
      it('should return 405 METHOD NOT ALLOWED', (done) => {
        request(app).post(route)
          .then((response) => {
            expect(response).status(405);
            done();
          })
          .catch((error) => { done(error); });
      })
    );
  } else if (method === 'get') {
    return (
      it('should return 405 METHOD NOT ALLOWED', (done) => {
        request(app).get(route)
          .then((response) => {
            expect(response).status(405);
            done();
          })
          .catch((error) => { done(error); });
      })
    );
  }

  return 'try different method';
};
