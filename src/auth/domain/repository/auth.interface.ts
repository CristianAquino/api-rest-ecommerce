import { AuthModel } from '@auth/model/auth.model';
import { UserDTO } from '@users/adapters/DTO/Out/user-out.dto';

export interface AuthRepository {
  insert(user: AuthModel): Promise<string>;
  createProfileUser(validate: AuthModel): Promise<UserDTO>;
  findByEmail(email: string): Promise<AuthModel>;
  findByCode(code: string): Promise<AuthModel>;
}
