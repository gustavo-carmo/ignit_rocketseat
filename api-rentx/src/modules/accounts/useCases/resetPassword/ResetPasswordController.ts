import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordUseCase from './ResetPasswordUseCase';

export default class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token: refresh_token, password } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ password, refresh_token });

    return response.status(200).send();
  }
}
