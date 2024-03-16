interface Post {
  id: string;
  title: string;
  body: string;
}

let database: Post[] = [];

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

  getById(postId: string): Post | undefined {
    return database.find((postItem) => postItem.id === postId);
  }

  updateById(postId: string, payload: { title: string; body: string }) {
    const POST_NOT_FOUND_NUMBER = -1;
    const index = database.findIndex((postItem) => postItem.id === postId);
    if (index === POST_NOT_FOUND_NUMBER) {
      return undefined;
    }

    database[index] = { ...database[index], title: payload.title, body: payload.body };

    return database[index];
  }

  deleteById(postId: string) {
    database = database.filter((postItem) => postItem.id !== postId);
  }
}

export const postInstance = new PostService();
