const fs = require('fs');
const config = require('../config/default.json');

const modes = ['development', 'test', 'staging', 'production'];
if (modes.includes(process.env.NODE_ENV)) {
  const filepath = `./server/config/${process.env.NODE_ENV}.json`;
  const file = fs.readFileSync(filepath, 'utf-8');
  if (file) {
    const json = JSON.parse(file);
    Object.assign(config, json);
  }
}

module.exports = config;
