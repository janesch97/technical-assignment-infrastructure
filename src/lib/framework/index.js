/**
 * Web framework implementation - write your code here
 *
 * This module should export your implementation of WebApp class.
 */
const http = require('http');
const MiddlewareLayer = require('./middlewareLayer');

class WebApp {
  #middlewareLayer;

  constructor() {
    this.#middlewareLayer = new MiddlewareLayer();
  }

  start() {
    // TODO: Implement start(port)
    return http.createServer().listen();
  }

  use(middleware) {
    return this.#middlewareLayer.use(middleware);
  }

  #runMiddleware(req, res) {
    return this.#middlewareLayer.run(req, res);
  }

}

module.exports = WebApp;
