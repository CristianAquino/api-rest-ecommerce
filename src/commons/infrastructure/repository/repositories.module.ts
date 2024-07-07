import { AuthRepositoryOrm } from '@auth/repository/auth.repository';
import { TypeOrmConfigModule } from '@commons/config/database-config/typeorm-config.module';
import { Auth } from '@commons/entities/auth.entity';
import { User } from '@commons/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryOrm } from '@users/repository/user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Auth])],
  providers: [UserRepositoryOrm, AuthRepositoryOrm],
  exports: [UserRepositoryOrm, AuthRepositoryOrm],
})
export class RepositoriesModule {}
