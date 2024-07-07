import { LoginUserUseCase } from '@auth/loginUser.usecase';
import { RegisterUserUseCase } from '@auth/registerUser.usecase';
import { AuthRepositoryOrm } from '@auth/repository/auth.repository';
import { EnviromentConfigModule } from '@commons/config/enviroment-config/enviroment-config.module';
import { EnviromentConfigService } from '@commons/config/enviroment-config/enviroment-config.service';
import { RepositoriesModule } from '@commons/repository/repositories.module';
import { GenerateCodeModule } from '@commons/service/code/generate_code.module';
import { GenerateCodeService } from '@commons/service/code/generate_code.service';
import { JwtModule } from '@commons/service/jwt/jwt.module';
import { JwtTokenService } from '@commons/service/jwt/jwt.service';
import { UseCaseProxy } from '@commons/usecases-proxy/usecase-proxy';
import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositoryOrm } from '@users/repository/user.repository';
import { UpdateUserUseCases } from '@users/updateUser.usecase';

@Module({
  imports: [
    GenerateCodeModule,
    JwtModule,
    EnviromentConfigModule,
    RepositoriesModule,
  ],
})
export class UsecaseProxyModule {
  static UPDATE_USER_USE_CASE = 'updateUserUsecaseProxy';
  static REGISTER_USE_CASE = 'registerUsecaseProxy';
  static LOGIN_USER_USE_CASE = 'loginUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.UPDATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new UpdateUserUseCases(userRepository)),
        },
        {
          inject: [AuthRepositoryOrm, GenerateCodeService],
          provide: UsecaseProxyModule.REGISTER_USE_CASE,
          useFactory: (
            authRepository: AuthRepositoryOrm,
            generateCode: GenerateCodeService,
          ) =>
            new UseCaseProxy(
              new RegisterUserUseCase(authRepository, generateCode),
            ),
        },
        {
          inject: [
            AuthRepositoryOrm,
            GenerateCodeService,
            JwtTokenService,
            EnviromentConfigService,
          ],
          provide: UsecaseProxyModule.LOGIN_USER_USE_CASE,
          useFactory: (
            authRepository: AuthRepositoryOrm,
            generateCode: GenerateCodeService,
            jwtTokenService: JwtTokenService,
            config: EnviromentConfigService,
          ) =>
            new UseCaseProxy(
              new LoginUserUseCase(
                authRepository,
                generateCode,
                jwtTokenService,
                config,
              ),
            ),
        },
      ],
      exports: [
        UsecaseProxyModule.UPDATE_USER_USE_CASE,
        UsecaseProxyModule.REGISTER_USE_CASE,
        UsecaseProxyModule.LOGIN_USER_USE_CASE,
      ],
    };
  }
}
