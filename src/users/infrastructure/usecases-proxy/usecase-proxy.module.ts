import { DynamicModule, Module } from '@nestjs/common';
import { EnviromentConfigModule } from 'src/commons/infrastructure/config/enviroment-config/enviroment-config.module';
import { CreateUserUseCases } from 'src/users/usecases/createUser.usecase';
import { GetAllUserUseCases } from 'src/users/usecases/getAllUsers.usecase';
import { UserRepositoryModule } from '../repository/repository.module';
import { UserRepositoryOrm } from '../repository/user.repository';
import { UseCaseProxy } from './usecase-proxy';

@Module({
  imports: [EnviromentConfigModule, UserRepositoryModule],
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCases(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new CreateUserUseCases(userRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
        UsecaseProxyModule.CREATE_USER_USE_CASE,
      ],
    };
  }
}
