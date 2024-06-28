import { RegisterUserDTO } from '@auth/DTO/In/auth-in.dto';
import { AuthRepository } from '@auth/repository/auth.interface';
import { Auth } from '@commons/entities/auth.entity';
import { IGenerateCodeService } from '@commons/repository/generate_code.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class RegisterUserUseCase {
  constructor(
    private authRepository: AuthRepository,
    private readonly generateCode: IGenerateCodeService,
  ) {}

  async execute(registerUserDTO: RegisterUserDTO): Promise<string> {
    const userExists = await this.authRepository.verifyIfEmailExists(
      registerUserDTO.email,
    );
    if (userExists) {
      throw new HttpException('Email already exits', HttpStatus.CONFLICT);
    }
    const auth = new Auth();
    auth.email = registerUserDTO.email;
    auth.code = this.generateCode.generateCode();
    const response = this.authRepository.register(auth);
    return response;
  }
}
