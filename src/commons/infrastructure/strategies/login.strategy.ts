import { LoginUserUseCase } from '@auth/loginUser.usecase';
import { UseCaseProxy } from '@commons/usecases-proxy/usecase-proxy';
import { UsecaseProxyModule } from '@commons/usecases-proxy/usecase-proxy.module';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(
    @Inject(UsecaseProxyModule.LOGIN_USER_USE_CASE)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUserUseCase>,
  ) {
    super();
  }
  async validate(req: Request): Promise<any> {
    const { email } = req.body;
    const user = await this.loginUsecaseProxy
      .getInstance()
      .validateEmailExists(email);

    if (user) {
      return 'ok';
    } else {
      throw new HttpException('Email no exits', HttpStatus.NOT_FOUND);
    }
  }
}
