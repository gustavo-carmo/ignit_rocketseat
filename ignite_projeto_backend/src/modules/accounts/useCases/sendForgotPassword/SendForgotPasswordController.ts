import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordUseCase from './SendForgotPasswordUseCase';

export default class SendForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordUseCase = container.resolve(
      SendForgotPasswordUseCase,
    );

    await sendForgotPasswordUseCase.execute(email);

    return response.status(200).send();
  }
}
