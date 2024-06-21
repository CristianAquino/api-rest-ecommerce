import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from 'src/commons/domain/config/database.interface';

@Injectable()
export class EnviromentConfigService implements DatabaseConfig {
  getDatabaseHost(): string {
    return process.env.DATABASE_HOST;
  }

  getDatabasePort(): number {
    return parseInt(process.env.DATABASE_PORT);
  }

  getDatabaseUser(): string {
    return process.env.DATABASE_USER;
  }

  getDatabasePassword(): string {
    return process.env.DATABASE_PASSWORD;
  }

  getDatabaseName(): string {
    return process.env.DATABASE_NAME;
  }

  getDatabaseSync(): boolean {
    return process.env.DATABASE_SYNC === 'true';
  }
}
