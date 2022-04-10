import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'limiter',
  points: Number(process.env.RATE_LIMITER_REQUESTS),
  duration: Number(process.env.RATE_LIMITER_TIME_IN_SECONDS),
});

const rateLimiter = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too Many Requests', 429);
  }
};

export default rateLimiter;
