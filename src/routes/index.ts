import { Router, Request, Response } from 'express';
import { postRouter } from './postRouter';

export const router = Router();

router.get('/', (request: Request, response: Response) => response.status(200).json({ message: 'Aplicação rodando' }));

router.use('/posts', postRouter);
