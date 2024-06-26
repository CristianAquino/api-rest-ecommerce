import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/adapters/auth.controller';
import { UserController } from 'src/users/adapters/user.controller';
import { UsecaseProxyModule } from '../infrastructure/usecases-proxy/usecase-proxy.module';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UserController, AuthController],
})
export class ControllerModule {}
