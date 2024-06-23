import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UseCaseProxy } from '../infrastructure/usecases-proxy/usecase-proxy';
import { UsecaseProxyModule } from '../infrastructure/usecases-proxy/usecase-proxy.module';
import { CreateUserUseCases } from '../usecases/createUser.usecase';
import { GetAllUserUseCases } from '../usecases/getAllUsers.usecase';
import { CreateUserDTO } from './DTO/In/user-in.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ALL_USERS_USE_CASE)
    private readonly getUserUseCaseProxy: UseCaseProxy<GetAllUserUseCases>,
    @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUseCaseProxy: UseCaseProxy<CreateUserUseCases>,
  ) {}

  @Get('/all-users')
  async getAllUsers(@Res() res: Response) {
    const result = await this.getUserUseCaseProxy.getInstance().execute();
    return res.status(200).json(result);
  }

  @Post('/create-user')
  async createUser(@Body() createUserDTO: CreateUserDTO, @Res() res: Response) {
    await this.createUserUseCaseProxy.getInstance().execute(createUserDTO);
    return res.status(201).json({ message: 'insert data success' });
  }
}
