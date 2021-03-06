# Router

Router is a minimal routing middleware for WebApp framework.

## Features

* Register a route using `get`, `post`, `put` or `delete` methods:

  ```js
  router.get('/:id', (req, res) => {
    // get a record
    const cat = catsDatastore.find(req.params.id);
    // set record as a server response body
    res.body = cat;
  });
  ```

  * `get`, `post`, `put` or `delete` methods take two parameters:
    * `path` - path template
    * `handler` - route handler function:
      * this is a function which will be fired once the route has been matched
      * it provides you with request (`http.IncomingMessage`, enriched with `body`, `params` (path parameters) and `query` (query string parameters) properties) and response (`http.ServerResponse`) objects

  * `Router` class internally holds a static array of supported HTTP methods, and uses it to dynamically generate `get`, `post`, `put` and `delete` methods. It's done in this way because I didn't want to duplicate code and new methods could be added easily, just by adding a new HTTP method to the array.

  * Routes are internally stored in a object with the following structure:

  ```json
  {
    "/path/:param": {
      "GET": getHandler,
      "POST": postHandler,
      ...
    },
    ...
  }
  ```


* Build the final routing middleware using `route` method:

  ```js
  // register routes using convinience methods

  // register routing middeware
  // set route prefix to /cats
  app.use(router.route({ prefix: '/cats' }))
  ```

  * `route` method takes a options parameter:
    * Set `prefix` property to a string, to add a prefix to your routes
    * Note: Currently only `prefix` property is used, others will be ignored


## Basic routing example

```js
// import Router module
const Router = require('./lib/router');

// create Router instance
const router = new Router();

router.get('/', (req, res) => {
  // do stuff
});

// register final routing middlware
// with a WebApp instance
app.use(router.route({ prefix: '/cats' }));
```

## Possible improvements

* While the current routing middleware does check for duplicate routes, it does not check for duplicate path prefixes. This could be solved by using a simple array to store all prefixes and check for duplicates during building of the final routing middleware
