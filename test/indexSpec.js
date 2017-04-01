const request = require('request');

const url = 'http://localhost:8080';

describe('Survey Scribe Server Suite', () => {
  describe('GET /', () => {
    it('returns status code 200', (done) => {
      request.get(url, (err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('POST /', () => {
    it('returns status code 201', (done) => {
      request.post(url, (err, res) => {
        expect(res.statusCode).toBe(201);
        done();
      });
    });
  });

  it('returns status code 404 for wrong url path', (done) => {
    request.get(url.concat('doesNotExist'), (err, res) => {
      expect(res.statusCode).toBe(404);
      done();
    });
  });
});
