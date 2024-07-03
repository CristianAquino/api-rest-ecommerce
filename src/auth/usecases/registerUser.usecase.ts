import { AuthRepository } from '@auth/repository/auth.interface';
import { Auth } from '@commons/entities/auth.entity';
import { IGenerateCodeService } from '@commons/repository/generate_code.interface';

export class RegisterUserUseCase {
  constructor(
    private authRepository: AuthRepository,
    private readonly generateCode: IGenerateCodeService,
  ) {}

  async execute(email: string): Promise<string> {
    const auth = new Auth();
    auth.email = email;
    auth.code = this.generateCode.generateCode();
    auth.activatedAt = Date.now().toString();
    return await this.authRepository.insert(auth);
  }
}
