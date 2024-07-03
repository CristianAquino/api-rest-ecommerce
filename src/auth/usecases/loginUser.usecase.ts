import { AuthRepository } from '@auth/repository/auth.interface';
import { IJwtService } from '@commons/adapters/jwt.interface';
import { JWTConfig } from '@commons/config/jwt.interface';
import { IGenerateCodeService } from '@commons/repository/generate_code.interface';

export class LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly generateCode: IGenerateCodeService,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
  ) {}

  async execute(email: string): Promise<string> {
    const userExists = await this.authRepository.findByEmail(email);
    userExists.code = this.generateCode.generateCode();
    userExists.activatedAt = Date.now().toString();
    return await this.authRepository.insert(userExists);
  }

  async validateEmailExists(email: string) {
    const found = await this.authRepository.findByEmail(email);
    if (!found) return null;
    return found;
  }

  async validateCodeExists(code: string) {
    const codeExists = await this.authRepository.findByCode(code);
    if (!codeExists) return null;
    return codeExists;
  }

  async validateCodeUserAndCreateUserProfile(code: string): Promise<string> {
    const user = await this.validateCodeExists(code);
    user.activatedAt = null;
    user.code = null;
    const data = await this.authRepository.createProfileUser(user);
    const token = this.jwtTokenService.createToken(
      { username: data.name },
      this.jwtConfig.getJwtSecret(),
      this.jwtConfig.getJwtExpirationTime(),
    );
    return token;
  }
}
