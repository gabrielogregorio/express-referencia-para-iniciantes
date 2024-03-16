import supertest from 'supertest';
import { app } from '../app';

export const request = supertest(app);

describe(' Testa se o servidor está rodando', () => {
  it('A aplicação deve responder', async () => {
    const response = await request.get('/');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ message: 'Aplicação rodando' });
  });
});
