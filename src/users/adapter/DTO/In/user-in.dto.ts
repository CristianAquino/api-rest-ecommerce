import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@src/users/domain/model/user.model';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class UpdateUserDTO extends UserModel {
  @ApiProperty({
    required: true,
    example: 'jhon doe',
    description: 'User name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  @ApiProperty({
    required: true,
    example: 'lorem',
    description: 'User first name',
  })
  first_name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  @ApiProperty({
    required: true,
    example: 'ipsum',
    description: 'User second name',
  })
  second_name: string;
  @ApiProperty({
    required: true,
    example: 'av. 123',
    description: 'User address',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  address: string;
}
