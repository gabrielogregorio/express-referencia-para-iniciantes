import rateLimit from 'express-rate-limit';
import { Request, Response } from '@/wrappers/express';
import { statusCode } from '../constants/statusCode';

const ONE_SECOND_IN_MS = 1000;
const SECONDS_IN_ONE_MINUTE = 60;
const timeInMinutesToRateLimitRequest = 5;
const MAX_REQUESTS_PER_TIME = 100;

export const useIpRequestLimiter = rateLimit({
  windowMs: timeInMinutesToRateLimitRequest * SECONDS_IN_ONE_MINUTE * ONE_SECOND_IN_MS,
  max: MAX_REQUESTS_PER_TIME,
  handler(request: Request, response: Response) {
    response.status(statusCode.tooManyRequests.code).json({
      message: statusCode.tooManyRequests.message,
    });
  },
});
