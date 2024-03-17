/**
 * This file is an independent mapping, created to be separated from the application. If we reused the "statusCode", accidental changes there would also result in the tests passing incorrectly, hence the idea having two status code and message files, to leave the tests "isolated from the application"
 */
export const statusCodeTestHelper = {
  success: 200,
  badRequest: 400,
  notFound: 404,
};

export const mapMessageTestHelper = {
  posts: {
    notFound: 'Post não encontrado',
  },
};
