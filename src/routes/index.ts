import { Router, Request, Response } from '@/facades/express';
import { postRouter } from './postRouter';
import { statusCode } from '../constants/statusCode';

export const router = Router();

router.get('/', (request: Request, response: Response) =>
  response.status(statusCode.success.code).json({ message: statusCode.success.message }),
);

router.use('/posts', postRouter);
