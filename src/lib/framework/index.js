/**
 * Web framework implementation - write your code here
 *
 * This module should export your implementation of WebApp class.
 */
const http = require('http');

class WebApp {
  use() {
    // TODO: Implement use(middleware)
  }

  start() {
    // TODO: Implement start(port)
    return http.createServer().listen();
  }
}

module.exports = WebApp;
