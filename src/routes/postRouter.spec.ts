import supertest from 'supertest';
import { app } from '../app';
import { mapMessageTestHelper, statusCodeTestHelper } from '../test/utils';

export const request = supertest(app);

const payloadCreatePost = {
  title: 'a title',
  body: 'a body',
};

const payloadUpdated = {
  title: 'new title',
  body: 'new body',
};
let postIdCreated: string;

describe('Posts', () => {
  it('should try create a post with invalid payload', async () => {
    const invalidPayload = {
      invalidParam: 'example',
    };
    const response = await request.post('/posts').send(invalidPayload);

    const expectedResponse = {
      message: 'Body is invalid "title" is required',
    };

    expect(response.statusCode).toEqual(statusCodeTestHelper.badRequest);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should try create a post with invalid values', async () => {
    const invalidPayload = {
      body: 1,
      title: null,
    };
    const response = await request.post('/posts').send(invalidPayload);

    const expectedResponse = {
      message: 'Body is invalid "title" must be a string',
    };

    expect(response.statusCode).toEqual(statusCodeTestHelper.badRequest);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should create a post', async () => {
    const response = await request.post('/posts').send(payloadCreatePost);

    const expectedResponse = {
      message: 'Post criado com sucesso',
      data: {
        ...payloadCreatePost,
        id: expect.anything(),
      },
    };

    expect(response.statusCode).toEqual(statusCodeTestHelper.success);
    expect(response.body).toEqual(expectedResponse);

    postIdCreated = response.body.data.id;
  });

  it('should get all posts', async () => {
    const response = await request.get('/posts');

    const expectedResponse = { data: [{ ...payloadCreatePost, id: expect.anything() }] };
    expect(response.statusCode).toEqual(statusCodeTestHelper.success);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should try get post by id, but invalid id', async () => {
    const response = await request.get(`/posts/invalidId`);

    const expectedResponse = {
      message: mapMessageTestHelper.posts.notFound,
    };
    expect(response.statusCode).toEqual(statusCodeTestHelper.notFound);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should get post by id', async () => {
    const response = await request.get(`/posts/${postIdCreated}`);

    const expectedResponse = {
      data: { ...payloadCreatePost, id: expect.anything() },
    };
    expect(response.statusCode).toEqual(statusCodeTestHelper.success);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should try edit post, but body is invalid', async () => {
    const invalidPayloadUpdated = {
      title: 1,
      body: 2,
    };

    const response = await request.put(`/posts/${postIdCreated}`).send(invalidPayloadUpdated);

    const expectedResponse = {
      message: 'Body is invalid "title" must be a string',
    };
    expect(response.statusCode).toEqual(statusCodeTestHelper.badRequest);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should try edit post by id, but id not found', async () => {
    const response = await request.put(`/posts/idNotFound`).send(payloadUpdated);

    const expectedResponse = {
      message: mapMessageTestHelper.posts.notFound,
    };
    expect(response.statusCode).toEqual(statusCodeTestHelper.notFound);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should edit post by id', async () => {
    const response = await request.put(`/posts/${postIdCreated}`).send(payloadUpdated);

    const expectedResponse = {
      message: 'Post atualizado com sucesso',
      data: {
        ...payloadUpdated,
        id: expect.anything(),
      },
    };
    expect(response.statusCode).toEqual(statusCodeTestHelper.success);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should try delete post by id, but id not found', async () => {
    const expectedResponse = {
      message: mapMessageTestHelper.posts.notFound,
    };

    const response = await request.delete(`/posts/idNotFound`);
    expect(response.statusCode).toEqual(statusCodeTestHelper.notFound);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should delete post by id', async () => {
    const response = await request.delete(`/posts/${postIdCreated}`);
    expect(response.statusCode).toEqual(statusCodeTestHelper.success);

    const responsePostById = await request.get(`/posts/${postIdCreated}`);
    expect(responsePostById.statusCode).toEqual(statusCodeTestHelper.notFound);
    expect(responsePostById.body).toEqual({ message: mapMessageTestHelper.posts.notFound });
  });
});
