import { AuthModel } from '@auth/model/auth.model';
import { UserResponseJWTDTO } from '@users/DTO/Out/user-out.dto';

export interface AuthRepository {
  insert(user: AuthModel): Promise<string>;
  createProfileUser(validate: AuthModel): Promise<UserResponseJWTDTO>;
  findByEmail(email: string): Promise<AuthModel>;
  findByCode(code: string): Promise<AuthModel>;
}
