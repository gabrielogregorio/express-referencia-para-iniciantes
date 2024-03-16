import supertest from 'supertest';
import { app } from '../app';

export const request = supertest(app);

const payloadCriarPosts = {
  title: 'myPost',
  body: 'myPost',
};
let idPostCriado: string;

describe('Testa a funcionalidade de posts', () => {
  it('Deve criar um post', async () => {
    const response = await request.post('/posts').send(payloadCriarPosts);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      message: 'Post criado',
      postCreated: {
        body: 'myPost',
        id: expect.anything(),
        title: 'myPost',
      },
    });

    idPostCriado = response.body.postCreated.id;
  });

  it('Deve obter todos os posts', async () => {
    const response = await request.get('/posts');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([{ body: 'myPost', id: expect.anything(), title: 'myPost' }]);
  });

  it('Deve obter um post pelo id', async () => {
    const response = await request.get(`/posts/${idPostCriado}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ body: 'myPost', id: expect.anything(), title: 'myPost' });
  });

  it('Deve editar um post pelo id', async () => {
    const response = await request.put(`/posts/${idPostCriado}`).send({
      title: 'novo titulo',
      body: 'novo body',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      title: 'novo titulo',
      id: expect.anything(),
      body: 'novo body',
    });
  });

  it('Deve deletar um post pelo id', async () => {
    const response = await request.delete(`/posts/${idPostCriado}`);
    expect(response.statusCode).toEqual(200);

    const responsePostById = await request.get(`/posts/${idPostCriado}`);
    expect(responsePostById.statusCode).toEqual(404);
    expect(responsePostById.body).toEqual({ message: 'Post não encontrado' });
  });
});
