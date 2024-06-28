import { AuthRepository } from '@auth/repository/auth.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class LogoutUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(validateCode: string): Promise<string> {
    const codeExists = await this.authRepository.verifyIfCodeExists(
      validateCode,
    );
    if (!codeExists) {
      throw new HttpException('User no exits', HttpStatus.NOT_FOUND);
    }

    codeExists.activated = false;
    codeExists.activatedAt = null;
    codeExists.code = null;
    const response = this.authRepository.logout(codeExists);
    return response;
  }
}
