import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnviromentConfigModule } from './commons/infrastructure/config/enviroment-config/enviroment-config.module';
import { UserController } from './users/adapters/user.controller';
import { UserModule } from './users/adapters/user.module';
import { UsecaseProxyModule } from './users/infrastructure/usecases-proxy/usecase-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Para que se pueda acceder desde cualquier parte del servidor,
      cache: true,
    }),
    UsecaseProxyModule.register(),
    UserModule,
    EnviromentConfigModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
