import { postControllerInstance } from '../controllers/postController';
import { useValidation } from '../middlewares/useValidation';
import { schemaCreatePost } from '../schemas/createPost';
import { schemaUpdatePost } from '../schemas/updatePost';
import { express } from '../wrappers/express';

export const postRouter = express.Router();

postRouter.post('/', useValidation(schemaCreatePost), postControllerInstance.create);
postRouter.get('/', postControllerInstance.getAll);
postRouter.get('/:postId', postControllerInstance.getById);
postRouter.put('/:postId', useValidation(schemaUpdatePost), postControllerInstance.updateById);
postRouter.delete('/:postId', postControllerInstance.deleteById);



