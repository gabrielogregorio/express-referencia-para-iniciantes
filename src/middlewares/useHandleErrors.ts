import 'express-async-errors';
import { NextFunction, Request, Response } from '@/wrappers/express';
import { CustomError } from '../errors';
import { statusCode } from '../constants/statusCode';
import { Log } from '../logger';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const useHandleErrors = (error: unknown, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    Log.warning(`CustomError ${error.status}-${error.message}`);
    response.status(error.status).json({ message: error.message });
    return;
  }

  if (error instanceof Error) {
    Log.error(`Error ${error.name} ${error.message} ${JSON.stringify(error?.stack)}`);
    response.status(statusCode.internalError.code).json({ message: statusCode.internalError.message });
    return;
  }

  Log.error(error);
  response.status(statusCode.internalError.code).json({ message: statusCode.internalError.message });
};
