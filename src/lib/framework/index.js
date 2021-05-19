const http = require('http');
const MiddlewareLayer = require('./middlewareLayer');

class WebApp {
  #middlewareLayer;

  constructor() {
    this.#middlewareLayer = new MiddlewareLayer();
  }

  start(port) {
    return http.createServer(async (req, res) => {
      try {
        if (req.method === 'POST' || req.method === 'PUT') {
          const body = await this.#parseBodyJson(req);
          req.body = body || {};
        }

        this.#runMiddleware(req, res);
      } catch (error) {
        console.error(error);

        res.statusCode = error.statusCode || 500;
        res.end(error.message);
      }

      if (!res.headersSent) {
        if (res.body) {
          res.write(JSON.stringify(res.body));
        }
        res.statusCode = 200;
        res.end();
      }
    }).listen(port);
  }

  use(middleware) {
    this.#middlewareLayer.register(middleware);
    return this;
  }

  #runMiddleware(req, res) {
    this.#middlewareLayer.run(req, res);
  }

  #parseBodyJson(req) {
    return new Promise((resolve, reject) => {
      let data = [];
      req.on('data', (chunk) => {
        data.push(chunk);
      });
      req.on('end', () => {
        const jsonString = Buffer.concat(data).toString();

        if (jsonString) {
          try {
            resolve(JSON.parse(jsonString));
          } catch (error) {
            reject(error);
          }
        }

        resolve({});
      });
      req.on('error', (error) => reject(error));
    });
  }
}

module.exports = WebApp;
