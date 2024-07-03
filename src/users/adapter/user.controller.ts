import { IJwtServicePayload } from '@commons/adapters/jwt.interface';
import { MessageDTO } from '@commons/DTO/Out/common-out.dto';
import { JwtAuthGuard } from '@commons/guards/jwtAuth.guard';
import { UseCaseProxy } from '@commons/usecases-proxy/usecase-proxy';
import { UsecaseProxyModule } from '@commons/usecases-proxy/usecase-proxy.module';
import {
  Body,
  Controller,
  Inject,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDTO } from '@users/DTO/In/user-in.dto';
import { UpdateUserUseCases } from '@users/updateUser.usecase';
import { Request, Response } from 'express';

@Controller('users')
@ApiTags('Users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 409, description: 'Conflict' })
export class UserController {
  constructor(
    @Inject(UsecaseProxyModule.UPDATE_USER_USE_CASE)
    private readonly createUserUseCaseProxy: UseCaseProxy<UpdateUserUseCases>,
  ) {}

  @Put('/update-user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ status: 201, type: MessageDTO })
  @ApiOperation({ summary: 'Update data user' })
  async createUser(
    @Body() updateUser: UpdateUserDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as IJwtServicePayload;
    const response = await this.createUserUseCaseProxy
      .getInstance()
      .execute(user.id, updateUser);
    return res.status(201).json({ message: response });
  }
}
