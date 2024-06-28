import { ValidateCodeDTO } from '@auth/DTO/In/auth-in.dto';
import { ValidateCodeResponseDTO } from '@auth/DTO/Out/auth-out.dto';
import { AuthRepository } from '@auth/repository/auth.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidateCodeUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(
    validateCode: ValidateCodeDTO,
  ): Promise<ValidateCodeResponseDTO> {
    const codeExists = await this.authRepository.verifyIfCodeExists(
      validateCode.code,
    );
    if (!codeExists) {
      throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
    }
    const d = new Date();
    codeExists.activatedAt = d.toISOString();
    codeExists.activated = true;
    return this.authRepository.validateCode(codeExists);
  }
}
