import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

export const useValidation =
  <Params, ResBody, ReqBody>(schema: ObjectSchema) =>
  (req: Request<Params, ResBody, ReqBody>, res: Response, next: NextFunction) => {
    // pega o schema e valida se o body está correto
    const validate = schema.validate(req.body);
    if (validate?.error) {
      // retorna um objeto app error com a informação do primeiro campo é inválido
      throw new AppError(`payload é inválido ${validate.error.details[0].message}`, 400);
    }

    // substitui o req.body da request pelos dados já validados e sanetizados pelo schema
    req.body = validate.value;

    // instrui a request a continuar, e ir para os proximos middleware. Sem isso a request não avança para o proximo middleware
    next();
  };
