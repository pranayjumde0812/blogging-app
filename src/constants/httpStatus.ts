export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export const HttpStatusMessages: Record<HttpStatus, string> = {
  [HttpStatus.OK]: 'Request succeeded.',
  [HttpStatus.CREATED]: 'Resource created successfully.',
  [HttpStatus.ACCEPTED]: 'Request accepted for processing.',
  [HttpStatus.NO_CONTENT]: 'No content to send for this request.',

  [HttpStatus.BAD_REQUEST]: 'Bad request. Please check the input.',
  [HttpStatus.UNAUTHORIZED]: 'Authentication is required and has failed.',
  [HttpStatus.FORBIDDEN]: 'You do not have permission to access this resource.',
  [HttpStatus.NOT_FOUND]: 'The requested resource could not be found.',
  [HttpStatus.METHOD_NOT_ALLOWED]:
    'The HTTP method is not allowed for this endpoint.',
  [HttpStatus.CONFLICT]:
    'Conflict occurred with the current state of the resource.',
  [HttpStatus.UNPROCESSABLE_ENTITY]:
    'The request is well-formed but could not be processed.',

  [HttpStatus.INTERNAL_SERVER_ERROR]:
    'An unexpected error occurred on the server.',
  [HttpStatus.NOT_IMPLEMENTED]: 'The requested feature is not implemented.',
  [HttpStatus.BAD_GATEWAY]: 'Invalid response from the upstream server.',
  [HttpStatus.SERVICE_UNAVAILABLE]: 'The server is currently unavailable.',
  [HttpStatus.GATEWAY_TIMEOUT]:
    'The server did not receive a timely response from the upstream server.',
};
