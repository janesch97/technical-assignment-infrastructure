class Router {
  #routeTable;

  constructor() {
    this.#routeTable = {};
  }

  #registerRoute(path, method, handler) {
    this.#routeTable[path] = { ...this.#routeTable, [method]: handler };
  }

  get(path, handler) {
    this.#registerRoute(path, 'GET', handler);
  }

  post(path, handler) {
    this.#registerRoute(path, 'POST', handler);
  }

  put(path, handler) {
    this.#registerRoute(path, 'PUT', handler);
  }

  delete(path, handler) {
    this.#registerRoute(path, 'DELETE', handler);
  }

  routes() {
    // TODO: Implement routes(options)
    return new Function();
  }
}

module.exports = Router;
