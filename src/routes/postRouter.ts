import express, { Router } from 'express';
import { postControllerInstance } from '../controllers/postController';
import { useValidation } from '../middlewares/useValidation';
import { schemaCreatePost } from '../schemas/post';

export const postRouter: Router = express.Router();

postRouter.post('/', useValidation(schemaCreatePost), postControllerInstance.create);
postRouter.get('/', postControllerInstance.getAll);
postRouter.get('/:postId', postControllerInstance.getById);
postRouter.put('/:postId', postControllerInstance.updateById);
postRouter.delete('/:postId', postControllerInstance.deleteById);
