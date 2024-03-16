import { Request, Response } from 'express';
import { postInstance } from '../services/postService';

class PostController {
  create(request: Request, response: Response) {
    const { title, body } = request.body;

    const postCreated = postInstance.create({ title, body });

    return response.status(200).json({ message: 'Post criado', postCreated });
  }

  getAll(request: Request, response: Response) {
    const posts = postInstance.getAll();

    return response.status(200).json(posts);
  }

  getById(request: Request, response: Response) {
    const { postId } = request.params;

    const postFounded = postInstance.getById(postId);

    if (postFounded === undefined) {
      return response.status(404).json({ message: 'Post não encontrado' });
    }

    return response.status(200).json(postFounded);
  }

  updateById(request: Request, response: Response) {
    const { title, body } = request.body;
    const { postId } = request.params;

    const postUpdated = postInstance.updateById(postId, { title, body });

    if (postUpdated === undefined) {
      return response.status(404).json({ message: 'Post não encontrado' });
    }

    return response.status(200).json(postUpdated);
  }

  deleteById(request: Request, response: Response) {
    const { postId } = request.params;

    postInstance.deleteById(postId);

    return response.status(200).json({ message: 'Post apagado' });
  }
}

export const postControllerInstance = new PostController();
