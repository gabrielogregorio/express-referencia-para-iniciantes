import { messages } from '../constants/messages';
import { statusCode } from '../constants/statusCode';
import { CustomError } from '../errors';

export interface Post {
  id: string;
  title: string;
  body: string;
}

const database: Post[] = [];
const POST_NOT_FOUND_NUMBER = -1;

class PostService {
  private generateUniqueIdByDate() {
    return new Date().getTime().toString();
  }

  public create(payload: { title: string; body: string }) {
    const newPost: Post = {
      title: payload.title,
      body: payload.body,
      id: this.generateUniqueIdByDate(),
    };

    database.push(newPost);

    return newPost;
  }

  getAll() {
    return database;
  }

  getById(postId: string): Post {
    const postFounded = database.find((postItem) => postItem.id === postId);

    if (!postFounded) {
      throw new CustomError(messages.post.notFound, statusCode.notFound.code);
    }

    return postFounded;
  }

  updateById(postId: string, payload: { title: string; body: string }) {
    const index = database.findIndex((postItem) => postItem.id === postId);
    if (index === POST_NOT_FOUND_NUMBER) {
      throw new CustomError(messages.post.notFound, statusCode.notFound.code);
    }

    database[index] = { ...database[index], title: payload.title, body: payload.body };

    return database[index];
  }

  deleteById(postId: string) {
    const postIndex = database.findIndex((postItem) => postItem.id === postId);
    if (postIndex === POST_NOT_FOUND_NUMBER) {
      throw new CustomError(messages.post.notFound, statusCode.notFound.code);
    }

    database.splice(postIndex, 1);
  }
}

export const postInstance = new PostService();
