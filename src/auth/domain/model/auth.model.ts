import { User } from '@commons/entities/user.entity';

export class AuthModel {
  id: number;
  code: string;
  email: string;
  activatedAt: string;
  createdAt: Date;
  updatedAd: Date;
  user: User;
}
