const { pathToRegexp } = require('path-to-regexp');

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

  #parsePath(path, uri) {
    const keys = [];
    const params = {};

    const regexp = pathToRegexp(path, keys);
    const match = regexp.exec(uri);

    if (match) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const param = match[i + 1];

        if (param) {
          params[key.name] = decodeURIComponent(param);
        }
      }

      return params;
    }

    return false;
  }

  #parseQueryString(uri) {
    const query = {};

    if (uri) {
      const regexp = new RegExp(/([^?&=]+)(?:=([^&]*))?/g);
      uri.replace(regexp, (_, key, value) => query[key] = value);
    }

    return query;
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
      let matched = false;
      for (const path in this.#routeTable) {
        const routes = Object.entries(this.#routeTable[path]);
        for (const route in routes) {
          const [method, handler] = routes[route];
          const [uriPath, queryString] = req.url.split(/\?(.*)/);

          const params = this.#parsePath(prefix + path, uriPath);

          if (params && req.method === method) {
            req.query = this.#parseQueryString(queryString);
            req.params = params;
            handler(req, res);
            matched = true;
            break;
          }
        }

        if (matched) {
          break;
        }
      }

      if (!matched) {
        res.statusCode = 404;
        res.end();
      }

      next();
    };
  }
}

module.exports = Router;
