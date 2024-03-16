import { PORT } from '@/config/envs';
import { app } from './app';

// o server pega o app e inicia ele, o server.ts também pode iniciar banco de dados e outras coisas
// em testes end to end, é desejável você conseguir iniciar o app em diferentes portas
// apontando para diferentes bancos e ambientes, por isso essa separação entre app
// e server
app.listen(PORT, () => {
  console.log(`App started in http://127.0.0.1:${PORT}`);
});
