import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ImportCategoryUseCase from './ImportCategoryUseCase';

export default class ImportCategoryController {
  handle(request: Request, response: Response): Response {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    if (!file) {
      throw new AppError('File is required');
    }

    importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}
