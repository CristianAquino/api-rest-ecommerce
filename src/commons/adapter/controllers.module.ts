import { AuthController } from '@auth/auth.controller';
import { UsecaseProxyModule } from '@commons/usecases-proxy/usecase-proxy.module';
import { Module } from '@nestjs/common';
import { UserController } from '@users/user.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UserController, AuthController],
})
export class ControllerModule {}
