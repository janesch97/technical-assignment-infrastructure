# WebApp

WebApp is a minimalistic, middleware-based Web framework for Node.js.

## Features

* Register a middleware function using `use` method:

  ```js
  app.use((req, res, next) => {
    // do stuff
    next(); // call next middleware in the stack
  });
  ```

  * `use` method takes only one parameter:
    * `middleware` - middleware function to be run on each request to the server
  * `use` method returns the current WebApp instance, so the calls are chainable
  * registered middleware are run in "first in, first out" order

* Middleware logic is implemented in `MiddlewareLayer` class. It exposes two methods, one for registering the middleware, other one for running middleware functions in the stack in the order they were registered.

* Automatically parses the body for POST and PUT HTTP requests as JSON
  * Note: Other types not supported

* Start a HTTP server on some arbitrary port using `start` method:
  
  ```js
  // register middleware

  // start a Node HTTP server 
  // listening on port 1337
  app.start(1337);
  ```

  * `start` method takes `port` parameter. It's the port HTTP server will run on
  * `start` method returns a `http.Server` instance, so you could programmatically close the server or attach additional event handlers

## Basic web app example

```js
// import WebApp
const WebApp = require('./lib/framework');

// create WebApp instance
const app = new WebApp();

// register middleware
app.use((req, res, next) => {
  // do stuff
  next(); // call next middleware in the stack
});

// start http server listening on port 1337
app.start(1337);
```
