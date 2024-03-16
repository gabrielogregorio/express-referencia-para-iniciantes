import cors from 'cors';

// sites que podem se comunicar com a api
// o navegador automaticamente inclue nas requests dos sites que rodam nele alguns headers
// que sempre serão enviados a api, e se não tiver na lista, a api pode bloquear
const corsOptions = {
  origin: ['https://valorant-tips.vercel.app/', 'http://127.0.0.1:3000'],
  optionsSuccessStatus: 200,
};

// Função que chama a função que monta os headers
export const useCors = () => cors(corsOptions);
