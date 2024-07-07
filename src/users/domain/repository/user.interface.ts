import { UserModel } from '../model/user.model';

export interface UserRepository {
  update(id: string, user: UserModel): Promise<string>;
}
