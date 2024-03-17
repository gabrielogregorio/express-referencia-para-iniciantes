import Joi from 'joi';
import { useValidationInput } from '../middlewares/useValidation';

export type CreateUpdateBodyType = {
  title: string;
  body: string;
};

const schemaBodyUpdatePost = Joi.object<CreateUpdateBodyType, true>().keys({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

export type CreateParamsUpdateBodyType = {
  postId: string;
};

const schemaParamsUpdatePost = Joi.object<CreateParamsUpdateBodyType, true>().keys({
  postId: Joi.string().required().trim(),
});

export const schemaUpdatePost: useValidationInput = {
  params: schemaParamsUpdatePost,
  body: schemaBodyUpdatePost,
};
