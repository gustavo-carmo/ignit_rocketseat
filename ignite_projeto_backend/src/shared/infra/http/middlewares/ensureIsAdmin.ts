import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

const ensureIsAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (!request.user) {
    throw new AppError('You must have being loged!');
  }

  const { is_admin } = request.user;

  if (!is_admin) {
    throw new AppError('User is not an Admin');
  }

  next();
};

export default ensureIsAdmin;
