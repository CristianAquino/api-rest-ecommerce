import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/commons/domain/entities/user.entity';
import { CreateUserDTO } from 'src/users/adapters/DTO/In/user-in.dto';
import { UserDTO } from 'src/users/adapters/DTO/Out/user-out.dto';
import { UserRepository } from 'src/users/domain/repository/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const found = await this.userRepository.findOneBy({
      name: createUserDTO.name,
    });

    if (found) {
      throw new HttpException('Name already exits', HttpStatus.CONFLICT);
    }
    const user = new User();
    user.name = createUserDTO.name;
    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.toUser(user));
  }

  private toUser(adminUserEntity: User): UserDTO {
    const adminUser: UserDTO = new UserDTO();

    adminUser.id = adminUserEntity.id;
    adminUser.name = adminUserEntity.name;

    return adminUser;
  }
}
