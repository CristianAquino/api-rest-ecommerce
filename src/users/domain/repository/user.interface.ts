import { CreateUserDTO } from 'src/users/adapters/DTO/In/user-in.dto';
import { UserDTO } from 'src/users/adapters/DTO/Out/user-out.dto';

export interface UserRepository {
  createUser(createUserDTO: CreateUserDTO): Promise<UserDTO>;
  getAllUsers(): Promise<UserDTO[]>;
}
