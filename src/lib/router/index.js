class Router {
  #routeTable;

  static #supportedHttpMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ]

  constructor() {
    this.#routeTable = {};

    for (const method of Router.#supportedHttpMethods) {
      this[method.toLowerCase()] = (path, handler) => {
        this.registerRoute(path, method, handler);
      };
    }
  }

  registerRoute(path, method, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Route handler must be a function');
    }

    if (this.#routeTable[path]?.[method]) {
      throw new Error(`Route ${method} ${path} already registred`);
    }

    this.#routeTable[path] = { ...this.#routeTable[path], [method]: handler };
  }

  routes({ prefix }) {
    return (req, res, next) => {

      next();
    };
  }
}

module.exports = Router;
