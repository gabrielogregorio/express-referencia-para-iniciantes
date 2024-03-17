import cors from 'cors';
import { CORS_ORIGINS } from '../config/envs';

const corsOptions = {
  origin: CORS_ORIGINS,
  optionsSuccessStatus: 200,
};

export const useCors = () => cors(corsOptions);
