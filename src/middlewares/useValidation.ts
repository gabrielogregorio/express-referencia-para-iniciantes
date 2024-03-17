import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from '@/facades/express';
import { CustomError } from '../errors';
import { statusCode } from '../constants/statusCode';

export type useValidationInput = {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
};

export const useValidation =
  <Params, ResponseBody, RequestBody>({ body, params, query }: useValidationInput) =>
  (request: Request<Params, ResponseBody, RequestBody>, response: Response, next: NextFunction) => {
    if (body) {
      const validate = body.validate(request.body);
      if (validate?.error) {
        throw new CustomError(`Body is invalid ${validate.error.details[0].message}`, statusCode.badRequest.code);
      }
      request.body = validate.value; // replaces req.body in the already validated body
    }

    if (params) {
      const validate = params.validate(request.params);
      if (validate?.error) {
        throw new CustomError(`Params is invalid ${validate.error.details[0].message}`, statusCode.badRequest.code);
      }
      request.params = validate.value; // replaces req.params in the already validated params
    }

    if (query) {
      const validate = query.validate(request.query);
      if (validate?.error) {
        throw new CustomError(`Query is invalid ${validate.error.details[0].message}`, statusCode.badRequest.code);
      }
      request.query = validate.value; // replaces req.query in the already validated query
    }

    next();
  };
