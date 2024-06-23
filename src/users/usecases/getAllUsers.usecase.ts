import { UserDTO } from '../adapters/DTO/Out/user-out.dto';
import { UserRepository } from '../domain/repository/user.interface';

export class GetAllUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<UserDTO[]> {
    return await this.usersRepository.getAllUsers();
  }
}
