import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { EnviromentConfigModule } from '../enviroment-config/enviroment-config.module';
import { EnviromentConfigService } from '../enviroment-config/enviroment-config.service';

function getTypeOrmModule(config: EnviromentConfigService) {
  let typeOrmMod: TypeOrmModuleOptions;
  if (process.env.ENVIROMENT === 'production') {
    typeOrmMod = {
      type: 'postgres',
      host: config.getDatabaseHost(),
      port: config.getDatabasePort(),
      username: config.getDatabaseUser(),
      password: config.getDatabasePassword(),
      database: config.getDatabaseName(),
      entities: [
        path.join(__dirname, '.', '..', '..', '..', '**', '*.entity{.ts,.js}'),
      ],
      synchronize: config.getDatabaseSync(),
    };
  } else {
    typeOrmMod = {
      type: 'sqlite',
      database: 'db-dev.sqlite',
      entities: [
        path.join(__dirname, '.', '..', '..', '..', '**', '*.entity{.ts,.js}'),
      ],
      synchronize: config.getDatabaseSync(),
    };
  }
  return typeOrmMod;
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnviromentConfigModule],
      inject: [EnviromentConfigService],
      useFactory: getTypeOrmModule,
    }),
  ],
  providers: [EnviromentConfigService],
})
export class TypeOrmConfigModule {}
