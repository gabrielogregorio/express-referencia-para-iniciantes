import { Request, Response } from '@/wrappers/express';
import { Post, postInstance } from '../services/postService';
import { CreatePostBodyType } from '../schemas/createPost';
import { messages } from '../constants/messages';
import {
  IHandleSendSuccessFull,
  handleSendSuccessFull,
  handleSendSuccessOnlyMessage,
} from '../handlers/handleSendSuccess';

class PostController {
  create(request: Request<never, never, CreatePostBodyType>, response: Response<IHandleSendSuccessFull<Post>>) {
    const { title, body } = request.body;

    const data = postInstance.create({ title, body });

    return handleSendSuccessFull(response, { data, message: messages.post.createSuccess });
  }

  getAll(request: Request, response: Response<IHandleSendSuccessFull<Post[]>>) {
    const data = postInstance.getAll();

    return handleSendSuccessFull(response, { data });
  }

  getById(request: Request, response: Response<IHandleSendSuccessFull<Post>>) {
    const { postId } = request.params;

    const data = postInstance.getById(postId);

    return handleSendSuccessFull(response, { data });
  }

  updateById(request: Request, response: Response<IHandleSendSuccessFull<Post>>) {
    const { title, body } = request.body;
    const { postId } = request.params;

    const postUpdated = postInstance.updateById(postId, { title, body });

    return handleSendSuccessFull(response, { message: messages.post.updateSuccess, data: postUpdated });
  }

  deleteById(request: Request, response: Response) {
    const { postId } = request.params;

    postInstance.deleteById(postId);

    return handleSendSuccessOnlyMessage(response, { message: messages.post.deleteSuccess });
  }
}

export const postControllerInstance = new PostController();
