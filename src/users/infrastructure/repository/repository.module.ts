import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/commons/domain/entities/user.entity';
import { TypeOrmConfigModule } from 'src/commons/infrastructure/config/database-config/typeorm-config.module';
import { UserRepositoryOrm } from './user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryOrm],
  exports: [UserRepositoryOrm],
})
export class UserRepositoryModule {}
