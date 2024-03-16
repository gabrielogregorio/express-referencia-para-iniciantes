import 'express-async-errors';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const useHandleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    console.warn(`AppError ${error.status}-${error.message}`);
    res.status(error.status).json({ message: error.message });
    return;
  }

  if (error instanceof Error) {
    console.error(`Error ${error.name} ${error.message} ${JSON.stringify(error?.stack)}`);
    res.status(500).json({ message: 'Internal Error' });
    return;
  }

  console.error(error);
  res.status(500).json({ message: 'Internal Error' });
};
