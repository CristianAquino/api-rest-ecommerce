import { EnviromentConfigModule } from '@commons/config/enviroment-config/enviroment-config.module';
import { ControllerModule } from '@commons/controllers.module';
import { JwtModule as JwtServiceModule } from '@commons/service/jwt/jwt.module';
import { CodeStrategy } from '@commons/strategies/code.strategy';
import { EmailStrategy } from '@commons/strategies/email.strategy';
import { JwtStrategy } from '@commons/strategies/jwt.strategy';
import { LoginStrategy } from '@commons/strategies/login.strategy';
import { UsecaseProxyModule } from '@commons/usecases-proxy/usecase-proxy.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    ConfigModule.forRoot({
      isGlobal: true, // Para que se pueda acceder desde cualquier parte del servidor,
      cache: true,
    }),
    UsecaseProxyModule.register(),
    ControllerModule,
    JwtServiceModule,
    EnviromentConfigModule,
  ],
  providers: [EmailStrategy, CodeStrategy, LoginStrategy, JwtStrategy],
})
export class AppModule {}
