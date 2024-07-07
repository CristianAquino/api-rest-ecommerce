import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EmailUserDTO {
  @ApiProperty({
    required: true,
    example: 'test@example.com',
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CodeUserDTO {
  @ApiProperty({
    required: true,
    example: 'AXR23Z',
    description: 'Unique code for the user',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  code: string;
}
