import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  name: string;
}
