import { CodeUserDTO, EmailUserDTO } from '@auth/DTO/In/auth-in.dto';
import { RegisterUserResponseDTO } from '@auth/DTO/Out/auth-out.dto';
import { LoginUserUseCase } from '@auth/loginUser.usecase';
import { RegisterUserUseCase } from '@auth/registerUser.usecase';
import { CodeGuard } from '@commons/guards/code.guard';
import { EmailGuard } from '@commons/guards/email.guard';
import { LoginGuard } from '@commons/guards/login.guard';
import { UseCaseProxy } from '@commons/usecases-proxy/usecase-proxy';
import { UsecaseProxyModule } from '@commons/usecases-proxy/usecase-proxy.module';
import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auths')
@ApiTags('Auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 409, description: 'Conflict' })
export class AuthController {
  constructor(
    @Inject(UsecaseProxyModule.REGISTER_USE_CASE)
    private readonly registerUseCaseProxy: UseCaseProxy<RegisterUserUseCase>,
    @Inject(UsecaseProxyModule.LOGIN_USER_USE_CASE)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUserUseCase>,
  ) {}

  @Post('/register')
  @UseGuards(EmailGuard)
  @ApiBody({ type: EmailUserDTO })
  @ApiResponse({ status: 200, type: RegisterUserResponseDTO })
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() emailUserDTO: EmailUserDTO, @Res() res: Response) {
    const response = await this.registerUseCaseProxy
      .getInstance()
      .execute(emailUserDTO.email);
    return res.status(200).json({ code: response });
  }

  @Post('/validate-code')
  @UseGuards(CodeGuard)
  @ApiBody({ type: CodeUserDTO })
  @ApiResponse({ status: 200 })
  @ApiOperation({ summary: 'Validate a user code' })
  async validateCode(@Body() codeUserDTO: CodeUserDTO, @Res() res: Response) {
    const response = await this.loginUseCaseProxy
      .getInstance()
      .validateCodeUserAndCreateUserProfile(codeUserDTO.code);
    return res.status(200).json({ token: response });
  }

  @Post('/login')
  @UseGuards(LoginGuard)
  @ApiBody({ type: EmailUserDTO })
  @ApiResponse({ status: 200, type: RegisterUserResponseDTO })
  @ApiOperation({ summary: 'login user' })
  async login(@Body() emailUserDTO: EmailUserDTO, @Res() res: Response) {
    const response = await this.loginUseCaseProxy
      .getInstance()
      .execute(emailUserDTO.email);
    return res.status(200).json({ code: response });
  }
}
