import { RegisterUserDTO } from '@auth/DTO/In/auth-in.dto';
import { AuthRepository } from '@auth/repository/auth.interface';
import { IGenerateCodeService } from '@commons/repository/generate_code.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginUserUseCase {
  constructor(
    private authRepository: AuthRepository,
    private readonly generateCode: IGenerateCodeService,
  ) {}

  async execute(registerUserDTO: RegisterUserDTO): Promise<string> {
    const userExists = await this.authRepository.verifyIfEmailExists(
      registerUserDTO.email,
    );

    if (!userExists) {
      throw new HttpException('Email no exits', HttpStatus.NOT_FOUND);
    }

    userExists.code = this.generateCode.generateCode();
    const response = await this.authRepository.login(userExists);
    return response;
  }
}
