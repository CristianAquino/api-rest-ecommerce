import { UserModel } from '@users/model/user.model';
import { UserRepository } from '@users/repository/user.interface';

export class UpdateUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(id: string, update: UserModel): Promise<string> {
    return this.usersRepository.update(id, update);
  }
}
