// Importa o Express e tipos específicos para Request e Response
import express, { Request, Response } from 'express';
// Importa o middleware personalizado para habilitar CORS
import { useCors } from '@/middlewares/useCors';

// Cria uma instância do app Express
const app = express();

// Aplica o middleware CORS para todas as requisições
app.use(useCors());

// Configurações padrão do Express para parsear o corpo das requisições
app.use(express.json()); // Para parsear corpos de requisições JSON
app.use(express.urlencoded({ extended: false })); // Para parsear corpos de requisições URL-encoded

// Define uma interface para a estrutura dos posts no "banco de dados"
interface Post {
  id: string;
  title: string;
  body: string;
}

// Banco de dados em memória para armazenar os posts
let database: Post[] = [];

// Endpoint para retornar uma mensagem simples na raiz
app.get('/', (request: Request, response: Response) => {
  console.log('Chamou endpoint main');

  return response.status(200).json({ message: 'ok, tudo certo' });
});

// Endpoint para criar um novo post
const generateUniqueIdByDate = (): string => new Date().getTime().toString();
app.post('/posts', (request: Request, response: Response) => {
  console.log('Criar um post');

  const { title, body } = request.body;

  const newPost: Post = { title, body, id: generateUniqueIdByDate() };

  database.push(newPost);

  return response.status(200).json({ message: 'Post criado', post: newPost });
});

// Endpoint para retornar todos os posts
app.get('/posts', (request: Request, response: Response) => {
  console.log('Retornar posts');

  return response.status(200).json(database);
});

// Endpoint para retornar um post específico pelo ID
app.get('/posts/:postId', (request: Request, response: Response) => {
  console.log('Retornar post pelo id');

  const { postId } = request.params;

  const post = database.find((postItem) => postItem.id === postId);

  if (post === undefined) {
    return response.status(404).json({ message: 'Post não encontrado' });
  }

  return response.status(200).json(post);
});

// Endpoint para atualizar um post específico pelo ID
const POST_NOT_FOUND_NUMBER = -1;
app.put('/posts/:postId', (request: Request, response: Response) => {
  console.log('Atualizar um post pelo id');

  const { title, body } = request.body;
  const { postId } = request.params;

  const index = database.findIndex((postItem) => postItem.id === postId);
  if (index === POST_NOT_FOUND_NUMBER) {
    return response.status(404).json({ message: 'Post não encontrado' });
  }

  database[index] = { ...database[index], title, body };

  return response.status(200).json(database[index]);
});

// Endpoint para deletar um post específico pelo ID
app.delete('/posts/:postId', (request: Request, response: Response) => {
  console.log('Deletar um post pelo id');

  const { postId } = request.params;

  database = database.filter((postItem) => postItem.id !== postId);

  return response.status(200).json({ message: 'Post apagado' });
});

// Exporta o aplicativo para ser usado em outros arquivos
export { app };
