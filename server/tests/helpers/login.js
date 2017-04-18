const app = require('../../index.js');
const User = require('mongoose').model('User');

module.exports = (agent, user = User.sample()) => (
  agent.post('/api/login').send(user)
  .then(response => response.body)
);
