const fs = require('fs');
const path = require('path');
const config = require('../config/default.json');

try {
  /*
   * NOTE: The Synchronous version of readFile is being used intentionally.
   * Excution should pause until configuration has been loaded, otherwise the
   * server might connect to the wrong database, open a listener on the wrong
   * port, etc. Even if this file is required in multiple places, node will only
   * execute this code once, so settings will only load once on startup.
   */
  const filepath = `./server/config/${process.env.NODE_ENV}.json`;
  const file = fs.readFileSync(filepath, 'utf-8');
  if (file) {
    const json = JSON.parse(file);
    Object.assign(config, json);
  }
} catch (error) {
  // Keep going if the file doesn't exist. Defaults have already been loaded.
  if (error.code === 'ENOENT') { /* no-op */ } else { throw error; }
}

module.exports = config;
