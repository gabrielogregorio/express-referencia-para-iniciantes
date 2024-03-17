import { Response } from '@/wrappers/express';
import { statusCode } from '../constants/statusCode';

export interface IHandleSendSuccessFull<T> {
  data: T;
  message?: string;
}

export const handleSendSuccessFull = <T>(
  response: Response<IHandleSendSuccessFull<T>>,
  payload: IHandleSendSuccessFull<T>,
) => response.status(statusCode.success.code).json(payload);

interface IHandleSendSuccessFullOnlyMessage {
  message: string;
}

export const handleSendSuccessOnlyMessage = (
  response: Response<IHandleSendSuccessFullOnlyMessage>,
  payload: IHandleSendSuccessFullOnlyMessage,
) => response.status(statusCode.success.code).json(payload);
