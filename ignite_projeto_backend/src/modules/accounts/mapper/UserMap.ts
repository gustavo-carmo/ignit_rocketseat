import { classToClass } from 'class-transformer';

import IUserResponseDTO from '../dtos/IUserResponseDTO';
import User from '../infra/typeorm/entities/User';

export default class UserMap {
  static toDTO({
    id,
    name,
    avatar,
    email,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO | null {
    const user = classToClass({
      id,
      name,
      avatar,
      email,
      driver_license,
      avatar_url,
    });

    return user;
  }
}
