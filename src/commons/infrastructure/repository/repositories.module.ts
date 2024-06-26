import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepositoryOrm } from 'src/auth/infrastructure/repository/auth.repository';
import { Auth } from 'src/commons/domain/entities/auth.entity';
import { User } from 'src/commons/domain/entities/user.entity';
import { TypeOrmConfigModule } from 'src/commons/infrastructure/config/database-config/typeorm-config.module';
import { UserRepositoryOrm } from 'src/users/infrastructure/repository/user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Auth])],
  providers: [UserRepositoryOrm, AuthRepositoryOrm],
  exports: [UserRepositoryOrm, AuthRepositoryOrm],
})
export class RepositoriesModule {}
