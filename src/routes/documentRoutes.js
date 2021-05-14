/**
 *  Definition of routes and route handlers - do not modify this code
 * ===================================================================
 *
 * You are only allowed to comment out unimplemented sections of this code for testing purposes.
 * TODO comments specify what needs to be implemented.
 */

const assert = require('assert');
const Router = require('../lib/router');
const { NotFoundError, ConflictError, InternalServerError } = require('../utils/error');

// TODO: implement the routing middleware constructor [6]
const routes = new Router();
const mockData = [];

// TODO: implement a 'get' method which registers the handler for the given GET path [7]
routes.get('/', (req, res) => {
// TODO: use the `res.body` to set the final response data in WebApp [4]
  res.body = mockData;
});

routes.get('/throw-error', (req, res) => {
// TODO: implement a global error handler which wraps around middleware. All errors caught by it should be logged and status code 500 should be set. [5]
  throw new Error('This is an intentional error which should be logged to stderr.');
});

// TODO: implement a 'get' method which registers the handler for the given GET path and extracts route parameters into `req.params` [7, 8]
routes.get('/:documentId', (req, res) => {
  const { documentId } = req.params;
  const document = mockData.find(((doc) => doc.id === Number.parseInt(documentId, 10)));
  assert(document, new NotFoundError(`document with id ${documentId} does not exist`));

  res.body = document;
});

// TODO: implement a 'post' method which registers the handler for the given POST path. [7]
// TODO: router should take care of handling the correct path, but WebApp should already provide the `req.body` data. [4]
routes.post('/', (req, res) => {
  assert(mockData.length <= 10, new InternalServerError('datastore is full'));

  const { body: document } = req;
  assert(!mockData.some((existing) => existing.id === document.id), new ConflictError(`document with id ${document.id} already exists`));

  mockData.push(document);
});

// TODO: ideally, all of the HTTP methods should be supported. [7]

module.exports = routes;
