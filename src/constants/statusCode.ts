export const statusCode = {
  success: { code: 200, message: 'success' },
  badRequest: { code: 400, message: 'payload is invalid' },
  notFound: { code: 404, message: 'not found' },
  internalError: { code: 500, message: 'internal server error' },
  tooManyRequests: { code: 429, message: 'too many requests' },
};
