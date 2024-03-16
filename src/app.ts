import express from 'express';

import { useCors } from '@/middlewares/useCors';
import { router } from './routes';
import { useHandleErrors } from './middlewares/useHandleErrors';

const app = express();

app.use(useCors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(useHandleErrors);

export { app };
