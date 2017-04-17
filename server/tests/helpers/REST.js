const RouteExpect = require('./RouteExpect.js');

const ItFactory = (message, callback) => () => it(message, callback);

exports.MethodNotAllowed = (method, route) => ItFactory(
  'should return 405 METHOD NOT ALLOWED',
  RouteExpect.Status(405, method, route)
);

exports.BadRequest = (method, route, data) => ItFactory(
  'should return 400 BAD REQUEST',
  RouteExpect.Status(400, method, route, data)
);

exports.NotFound = (method, route) => ItFactory(
  'should return 404 NOT FOUND',
  RouteExpect.Status(404, method, route)
);

exports.Unauthorized = (method, route) => ItFactory(
  'should return 401 UNAUTHORIZED',
  RouteExpect.Status(401, method, route, {}, false)
);
