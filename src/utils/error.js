class ApiError extends Error {
  constructor(message, statusCode, statusMessage = null) {
    super(message);
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}

class AuthorizationError extends ApiError {
  constructor(message = null) {
    super(message ?? 'unauthorized access to resource', 403, 'unauthorized');
  }
}

class NotFoundError extends ApiError {
  constructor(message = null) {
    super(message ?? 'resource not found', 404, 'not found');
  }
}

class ConflictError extends ApiError {
  constructor(message = null) {
    super(message ?? 'resource conflict', 409, 'conflict');
  }
}

class InternalServerError extends ApiError {
  constructor(message = null) {
    super(message ?? 'internal server error', 500, 'internal server error');
  }
}

module.exports = {
  ApiError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
