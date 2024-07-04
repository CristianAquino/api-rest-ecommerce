import { User } from '@commons/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '@users/model/user.model';
import { UserRepository } from '@users/repository/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async update(id: string, user: UserModel): Promise<string> {
    user.isRegistered = true;
    await this.userRepository.update({ id }, user);
    return 'correct update';
  }
}
