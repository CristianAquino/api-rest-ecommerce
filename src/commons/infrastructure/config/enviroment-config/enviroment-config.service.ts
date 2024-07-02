import { DatabaseConfig } from '@commons/config/database.interface';
import { JWTConfig } from '@commons/config/jwt.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnviromentConfigService implements DatabaseConfig, JWTConfig {
  getJwtSecret(): string {
    return process.env.JWT_SECRET;
  }
  getJwtExpirationTime(): string {
    return process.env.JWT_EXPIRATION_TIME;
  }
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
