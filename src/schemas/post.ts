import Joi from 'joi';

export type CreatePostBodyType = {
  title: string;
  body: string;
};

// o true é para impedir que usuário envie parâmetros extras, que possam eventualmente
// abrir alguma brecha. Aqui só poderá ser passado title e body, como string, nada a mais
// e nada a menos
export const schemaCreatePost = Joi.object<CreatePostBodyType, true>().keys({
  title: Joi.string().required(),
  body: Joi.string().required(),
});
