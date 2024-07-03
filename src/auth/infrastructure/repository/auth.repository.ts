import { AuthModel } from '@auth/model/auth.model';
import { AuthRepository } from '@auth/repository/auth.interface';
import { Auth } from '@commons/entities/auth.entity';
import { User } from '@commons/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '@users/adapters/DTO/Out/user-out.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepositoryOrm implements AuthRepository {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<AuthModel> {
    const found = await this.authRepository.findOneBy({
      email,
    });
    if (!found) return null;
    return found;
  }
  async findByCode(code: string): Promise<AuthModel> {
    const found = await this.authRepository.findOneBy({ code });
    if (!found) return null;
    return found;
  }

  async insert(user: AuthModel): Promise<string> {
    const saved = await this.authRepository.save(user);
    return saved.code;
  }

  // metodo para cuando se valida el codigo == crear un user y almacenarlo
  async createProfileUser(createProfile: AuthModel): Promise<UserDTO> {
    if (createProfile.isActivated) {
      // return await this.userRepository.findOne({
      //   where: { auth: { id: createProfile.id } },
      //   relations: ['auth'],
      // });
      await this.authRepository.save(createProfile);
      return await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.auth', 'auth')
        .where('auth.id = :id', { id: createProfile.id })
        .getOne();
    }
    const user = new User();
    // change value here
    user.name = 'sdas';
    const saved = await this.userRepository.save(user);
    createProfile.isActivated = true;
    createProfile.user = saved;
    await this.authRepository.save(createProfile);
    return saved;
  }
}
