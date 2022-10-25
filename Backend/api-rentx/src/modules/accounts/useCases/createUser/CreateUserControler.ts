import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateUserDTO from '@modules/accounts/dtos/IcreateUserDTO';

import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license }: ICreateUserDTO =
      request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
    });

    return response.status(201).json(user);
  }
}
