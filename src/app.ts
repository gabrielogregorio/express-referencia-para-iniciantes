// Importa o Express e tipos específicos para Request e Response
import express from 'express';
// Importa o middleware personalizado para habilitar CORS
import { useCors } from '@/middlewares/useCors';
import { router } from './routes';
import { useHandleErrors } from './middlewares/useHandleErrors';

// Cria uma instância do  a pp Express
const app = express();

// Aplica o middleware CORS para todas  as requisições
app.use(useCors());

app.use(express.json()); // Para parsear corpos de requisi çõ es JSON
app.use(express.urlencoded({ extended: false })); // Para parsear corpos de requi s içõ es URL-encoded

app.use(router);

app.use(useHandleErrors);

// Exporta  o a plic at ivo para ser usado em outros arquivos
export { app };
