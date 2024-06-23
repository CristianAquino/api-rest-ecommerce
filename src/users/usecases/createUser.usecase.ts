import { CreateUserDTO } from '../adapters/DTO/In/user-in.dto';
import { UserDTO } from '../adapters/DTO/Out/user-out.dto';
import { UserRepository } from '../domain/repository/user.interface';

export class CreateUserUseCases {
  constructor(private usersRepository: UserRepository) {}

  async execute(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return this.usersRepository.createUser(createUserDTO);
  }
}
