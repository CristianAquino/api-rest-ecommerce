import { RegisterUserDTO } from '@auth/DTO/In/auth-in.dto';
import { AuthRepository } from '@auth/repository/auth.interface';
import { Auth } from '@commons/entities/auth.entity';
import { IGenerateCodeService } from '@commons/repository/generate_code.interface';

export class RegisterUserUseCase {
  constructor(
    private authRepository: AuthRepository,
    private readonly generateCode: IGenerateCodeService,
  ) {}

  async execute(registerUserDTO: RegisterUserDTO): Promise<string> {
    const auth = new Auth();
    auth.email = registerUserDTO.email;
    auth.code = this.generateCode.generateCode();
    auth.activatedAt = Date.now().toString();
    return await this.authRepository.insert(auth);
  }
}
