import { LoginUserUseCase } from '@auth/loginUser.usecase';
import { UseCaseProxy } from '@commons/usecases-proxy/usecase-proxy';
import { UsecaseProxyModule } from '@commons/usecases-proxy/usecase-proxy.module';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

export class CodeStrategy extends PassportStrategy(Strategy, 'code') {
  constructor(
    @Inject(UsecaseProxyModule.LOGIN_USER_USE_CASE)
    private readonly codeUsecaseProxy: UseCaseProxy<LoginUserUseCase>,
  ) {
    super();
  }
  async validate(req: Request): Promise<any> {
    const { code } = req.body;
    const max = 24 * 60 * 60 * 1000;
    const user = await this.codeUsecaseProxy
      .getInstance()
      .validateCodeExists(code);

    if (!user) {
      throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
    }
    if (Date.now() - +user.activatedAt > max) {
      throw new HttpException(
        'The code is expired, try again',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'ok';
  }
}
